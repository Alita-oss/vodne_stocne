import { PriceList } from '../../models/priceList';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = ['waterPricePerM3', 'sewagePricePerM3', 'sewageM3PricePerPerson', 'vatPercentage'];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedPriceList = await PriceList.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedPriceList,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating price list`, err);
    }
});
