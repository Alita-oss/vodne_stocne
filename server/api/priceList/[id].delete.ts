import { PriceList } from '../../models/priceList';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';
import { BillingPeriod } from '../../models/billingPeriod';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        // If the price list is already referenced in any billing period, it should not be deleted
        const isUsedInBillingPeriods = await BillingPeriod.findOne({ priceList: id });
        if (isUsedInBillingPeriods) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        await PriceList.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting price list`, err);
    }
});
