import { Schema, model } from 'mongoose';
import type { Village as VillageType } from '../../types/village';
import { VillageName } from '../../types/village';

const villageSchema = new Schema<VillageType>({
    name: {
        type: String,
        required: true,
        enum: Object.values(VillageName),
    },
});

export const Village = model<VillageType>('Village', villageSchema);
