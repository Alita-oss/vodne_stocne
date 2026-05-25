import { Schema, model } from 'mongoose';
import type { PriceList as PriceListType } from '../../types/priceList';

const priceListSchema = new Schema<PriceListType>({
    waterPricePerM3: {
        type: Number,
        required: true,
    },
    sewagePricePerM3: {
        type: Number,
        required: true,
    },
    sewageM3PricePerPerson: {
        type: Number,
        required: true,
    },
    vatPercentage: {
        type: Number,
        required: true,
    },
});

export const PriceList = model<PriceListType>('PriceList', priceListSchema);
