import { BillingPeriod } from '../../models/billingPeriod';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';
import { Consumption } from '../../models/consumption';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        //later logic, that prevents deletion of a billing period if there are already Consumption records associated with it
        const existingConsumption = await Consumption.exists({ billingPeriod: id });
        if (existingConsumption) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        await BillingPeriod.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting billing period`, err);
    }
});
