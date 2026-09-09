import { BillingPeriod } from '../../models/billingPeriod';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (typeof body.isClosed !== 'boolean' || !body.dateFrom || !body.dateTo || !body.priceList) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        if (new Date(body.dateFrom) > new Date(body.dateTo)) {
            throw new Error(ErrorTypes[status.BAD_REQUEST]);
        }

        const existingBillingPeriod = await BillingPeriod.findOne({
            //mongodb query operators to check if there is an existing billing period that overlaps with the new one
            dateFrom: { $lte: body.dateTo },
            dateTo: { $gte: body.dateFrom },
        });

        if (existingBillingPeriod) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const newBillingPeriod = await BillingPeriod.create(body);

        return {
            newBillingPeriod,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new billing period`, err);
    }
});
