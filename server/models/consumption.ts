import { Types, Schema, model } from 'mongoose';
import type { Consumption as ConsumptionType } from '../../types/consumption';

const consumptionSchema = new Schema<ConsumptionType>({
    startStateM3: {
        type: Number,
        required: true,
    },
    endStateM3: {
        type: Number,
        required: false,
    },
    peopleCountSnapshot: {
        type: Number,
        required: false,
    },
    m3Calculated: {
        type: Number,
        required: true,
    },
    resident: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true,
    },
    billingPeriod: {
        type: Types.ObjectId,
        ref: 'BillingPeriod',
        required: true,
    },
});

export const Consumption = model<ConsumptionType>('Consumption', consumptionSchema);
