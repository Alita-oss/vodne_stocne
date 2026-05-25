import type { Consumption } from './consumption';
import { Types } from 'mongoose';

export type Invoice = {
    _id: string;
    invoiceNumber: number;
    totalAmount: number;
    roundedTotalAmount: number;
    isPaid: boolean;
    paidAt?: Date;
    VsWater: number;
    VsSewage: number;
    consumption: Types.ObjectId | Consumption;
};
