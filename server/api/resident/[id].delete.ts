import { Resident } from '../../models/resident';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        await Resident.findByIdAndDelete(id);

        return {
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error deleting resident`, err);
    }
});
