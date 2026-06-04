import type { Village } from './village';
import { Types } from 'mongoose';

export type Resident = {
    _id: string;
    degree?: string;
    firstName: string;
    lastName: string;
    streetNumber: number;
    postalCode: number;
    village: Types.ObjectId | Village;
    hasWater?: boolean;
    hasSewage?: boolean;
    waterMeterNumber?: number;
    peopleInHousehold?: number;
};
