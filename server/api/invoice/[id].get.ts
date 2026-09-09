import { Invoice } from '../../models/invoice';
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

        const invoice = await Invoice.findById(id);
        if (!invoice) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }
        console.log('invoice: ', invoice);

        return {
            invoice,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get invoice by id`, err);
    }
});
