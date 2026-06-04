import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix } from '../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        await Consumption.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting consumption`, err);
    }
});
