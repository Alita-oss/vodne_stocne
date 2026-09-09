import { Village } from '../../models/village';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const villages = await Village.find();

        return {
            villages,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all villages`, err);
    }
});
