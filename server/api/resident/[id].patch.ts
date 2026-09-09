import { Resident } from '../../models/resident';
import status from 'http-status';
import { ErrorPrefix } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const id = checkParam(event, 'id');
        const body = await readBody(event);

        const allowedFields = [
            'degree',
            'firstName',
            'lastName',
            'streetNumber',
            'postalCode',
            'village',
            'hasWater',
            'hasSewage',
            'waterMeterNumber',
            'peopleInHousehold',
        ];

        const updateData: Partial<Record<string, any>> = {};
        for (const key of allowedFields) {
            if (key in body) {
                updateData[key] = body[key];
            }
        }

        const updatedResident = await Resident.findByIdAndUpdate(id, updateData, { new: true });

        return {
            updatedResident,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error updating resident`, err);
    }
});
