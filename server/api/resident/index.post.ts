import { Resident } from '../../models/resident';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        if (!body.firstName || !body.lastName || !body.streetNumber || !body.postalCode || !body.village) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingResident = await Resident.findOne({
            firstName: body.firstName,
            lastName: body.lastName,
            streetNumber: body.streetNumber,
            village: body.village,
        });

        if (existingResident) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        const newResident = await Resident.create(body);

        return {
            newResident,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new resident`, err);
    }
});
