import type { Consumption } from './consumption';
import { Types } from 'mongoose';

export type Invoice = {
    _id: string;
    invoiceNumber: number;
    water: {
        baseAmount: number;
        vatAmount: number;
        totalAmount: number;
        roundedTotalAmount: number;
    };
    sewage: {
        baseAmount: number;
        vatAmount: number;
        totalAmount: number;
        roundedTotalAmount: number;
    };
    isPaid: boolean;
    paidAt?: Date;
    vsWater?: number;
    vsSewage?: number;
    consumption: Types.ObjectId | Consumption;
};
