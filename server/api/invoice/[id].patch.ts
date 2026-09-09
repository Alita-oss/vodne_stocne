import { Invoice } from '../../models/invoice';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['isPaid', 'paidAt'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedInvoice,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating invoice`, err);
    }
});
