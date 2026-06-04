import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix } from '../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const consumptions = await Consumption.find();

        return {
            consumptions,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all consumptions`, err);
    }
});
