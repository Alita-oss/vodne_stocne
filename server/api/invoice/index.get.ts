import { Invoice } from '../../models/invoice';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const invoices = await Invoice.find();

        return {
            invoices,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all invoices`, err);
    }
});
