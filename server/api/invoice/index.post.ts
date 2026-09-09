import { Invoice } from '../../models/invoice';
import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.consumption) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        //ts doesnt know that billingPeriod and priceList are string but it´s checked with this runtime check - populate
        const consumption = await Consumption.findById(body.consumption)
            .populate('resident')
            .populate({
                path: 'billingPeriod',
                populate: {
                    path: 'priceList',
                },
            });

        if (!consumption) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const billingPeriod = consumption.billingPeriod;

        if (!billingPeriod) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const priceList = billingPeriod.priceList;

        if (!priceList) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const resident = consumption.resident;
        const vsWater = generateWaterVS(resident., resident.streetNumber);
        const vsSewage = generateSewageVS(resident., resident.streetNumber); 

        if (!resident) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const existingInvoice = await Invoice.findOne({ consumption: body.consumption });
        if (existingInvoice) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        //calculation
        //water
        const waterBase = consumption.m3Calculated * priceList.waterPricePerM3;

        //sewage
        const isWaterMeter = consumption.endStateM3 != null;
        const sewageBase = isWaterMeter
            ? consumption.m3Calculated * priceList.sewagePricePerM3 //with water meter
            : (consumption.peopleCountSnapshot ?? 0) * priceList.sewageM3PricePerPerson; //without water meter

        //vat
        const vatRate = priceList.vatPercentage / 100;
        const waterVat = waterBase * vatRate;
        const sewageVat = sewageBase * vatRate;

        //total
        const waterTotal = waterBase + waterVat;
        const sewageTotal = sewageBase + sewageVat;

        //rounding
        const waterRounded = Math.round(waterTotal);
        const sewageRounded = Math.round(sewageTotal);

        //invoice number
        const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
        const invoiceNumber = (lastInvoice?.invoiceNumber ?? 0) + 1;

        const invoice = await Invoice.create({
            invoiceNumber: invoiceNumber,
            water: {
                baseAmount: waterBase,
                vatAmount: waterVat,
                totalAmount: waterTotal,
                roundedTotalAmount: waterRounded,
            },
            sewage: {
                baseAmount: sewageBase,
                vatAmount: sewageVat,
                totalAmount: sewageTotal,
                roundedTotalAmount: sewageRounded,
            },
            isPaid: false,
            paidAt?: null,
            vsWater,
            vsSewage,
            consumption: body.consumption,
        });

        return {
            invoice,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API}  Error creating new invoice`, err);
    }
});
