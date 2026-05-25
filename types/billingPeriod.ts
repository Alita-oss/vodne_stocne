import type { PriceList } from './priceList';
import { Types } from 'mongoose';

export type BillingPeriod = {
    _id: string;
    isClosed: boolean;
    dateFrom: Date;
    dateTo: Date;
    priceList: Types.ObjectId | PriceList;
};
