import { PriceList } from '../../models/priceList';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const priceLists = await PriceList.find().sort({ _id: -1 });

        return {
            priceLists,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Failed to get all price lists`, err);
    }
});
