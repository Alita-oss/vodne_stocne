import { Types, Schema, model } from 'mongoose';
import type { BillingPeriod as BillingPeriodType } from '../../types/billingPeriod';

const billingPeriodSchema = new Schema<BillingPeriodType>({
    isClosed: {
        type: Boolean,
        required: true,
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    },
    priceList: {
        type: Types.ObjectId,
        ref: 'PriceList',
        required: true,
    },
});

export const BillingPeriod = model<BillingPeriodType>('BillingPeriod', billingPeriodSchema);
