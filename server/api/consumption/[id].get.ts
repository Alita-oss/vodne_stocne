import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        if (!Types.ObjectId.isValid(id)) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const consumption = await Consumption.findById(id);
        console.log('consumption: ', consumption);

        return {
            consumption,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get consumption by id`, err);
    }
});
