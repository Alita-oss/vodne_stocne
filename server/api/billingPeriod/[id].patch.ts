import { BillingPeriod } from '../../models/billingPeriod';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['isClosed', 'dateFrom', 'dateTo', 'priceList'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        //later logic,if isClosed === true, dateFrom, dateTo a priceList should not be editable
        const existingBillingPeriod = await BillingPeriod.findById(id);

        if (existingBillingPeriod?.isClosed) {
            const forbidden = ['dateFrom', 'dateTo', 'priceList'];

            const isTryingToUpdateForbiddenField = forbidden.some((field) => field in updateData);
            if (isTryingToUpdateForbiddenField) {
                throw new Error(ErrorTypes[status.CONFLICT]);
            }
        }

        const updatedBillingPeriod = await BillingPeriod.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedBillingPeriod,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating billing period`, err);
    }
});
