import { PriceList } from '../../models/priceList';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (
            typeof body.waterPricePerM3 !== 'number' ||
            typeof body.sewagePricePerM3 !== 'number' ||
            typeof body.sewageM3PricePerPerson !== 'number' ||
            typeof body.vatPercentage !== 'number'
        ) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingPriceList = await PriceList.findOne({
            waterPricePerM3: body.waterPricePerM3,
            sewagePricePerM3: body.sewagePricePerM3,
            sewageM3PricePerPerson: body.sewageM3PricePerPerson,
            vatPercentage: body.vatPercentage,
        });

        if (existingPriceList) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const newPriceList = await PriceList.create(body);

        return {
            newPriceList,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new price list`, err);
    }
});
