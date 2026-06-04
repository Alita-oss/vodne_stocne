import { BillingPeriod } from '../../models/billingPeriod';
import status from 'http-status';
import { ErrorPrefix } from '../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const billingPeriods = await BillingPeriod.find().sort({ dateFrom: -1 });

        return {
            billingPeriods,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all billing periods`, err);
    }
});
