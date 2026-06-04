import { PriceList } from '../../models/priceList';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';
import { Types } from 'mongoose';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');

        if (!Types.ObjectId.isValid(id)) {
            throw new Error(ErrorTypes[status.NOT_FOUND]);
        }

        const priceList = await PriceList.findById(id);
        console.log('priceList: ', priceList);

        return {
            priceList,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get price list by id`, err);
    }
});
