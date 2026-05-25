import { Types, Schema, model } from 'mongoose';
import type { Invoice as InvoiceType } from '../../types/invoice';

const invoiceSchema = new Schema<InvoiceType>({
    invoiceNumber: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    roundedTotalAmount: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    paidAt: {
        type: Date,
        required: false,
    },
    VsWater: {
        type: Number,
        required: true,
    },
    VsSewage: {
        type: Number,
        required: true,
    },
    consumption: {
        type: Types.ObjectId,
        ref: 'Consumption',
        required: true,
    },
});

export const Invoice = model<InvoiceType>('Invoice', invoiceSchema);
