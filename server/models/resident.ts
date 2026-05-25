import { Types, Schema, model } from 'mongoose';
import type { Resident as ResidentType } from '../../types/resident';

const residentSchema = new Schema<ResidentType>({
    degree: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    streetNumber: {
        type: Number,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    village: {
        type: Types.ObjectId,
        ref: 'Village',
        required: true,
    },
    hasWater: {
        type: Boolean,
        required: false,
    },
    hasSewage: {
        type: Boolean,
        required: false,
    },
    waterMeterNumber: {
        type: Number,
        required: false,
    },
    peopleInHousehold: {
        type: Number,
        required: true,
    },
});

export const Resident = model<ResidentType>('Resident', residentSchema);
