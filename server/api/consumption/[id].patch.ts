import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['startStateM3', 'endStateM3', 'peopleCountSnapshot', 'resident', 'billingPeriod'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedConsumption = await Consumption.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedConsumption,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating consumption`, err);
    }
});
