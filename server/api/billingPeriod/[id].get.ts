import { BillingPeriod } from '../../models/billingPeriod';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        if (!Types.ObjectId.isValid(id)) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const billingPeriod = await BillingPeriod.findById(id);
        console.log('billingPeriod: ', billingPeriod);

        return {
            billingPeriod,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get billing period by id`, err);
    }
});
