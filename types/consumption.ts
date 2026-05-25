import type { Resident } from './resident';
import type { BillingPeriod } from './billingPeriod';
import { Types } from 'mongoose';

export type Consumption = {
    _id: string;
    startStateM3: number;
    endStateM3?: number;
    peopleCountSnapshot?: number;
    m3Calculated: number;
    resident: Types.ObjectId | Resident;
    billingPeriod: Types.ObjectId | BillingPeriod;
};
