import { Resident } from '../../models/resident';
import status from 'http-status';
import { ErrorPrefix } from '../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const residents = await Resident.find();

        return {
            residents,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all residents`, err);
    }
});
