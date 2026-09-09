import { Consumption } from '../../models/consumption';
import status from 'http-status';
import { ErrorPrefix, ErrorTypes } from '../../../types/error';
import { checkParam, handleCatchError } from '../../utils/api';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (body.startStateM3 == null || body.resident == null || body.billingPeriod == null) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        if (body.startStateM3 < 0 || body.endStateM3 < 0) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        if (body.endStateM3 != null && body.endStateM3 < body.startStateM3) {
            throw new Error(ErrorTypes[status.PRECONDITION_FAILED]);
        }

        const existingConsumption = await Consumption.findOne({
            resident: body.resident,
            billingPeriod: body.billingPeriod,
        });

        if (existingConsumption) {
            throw new Error(ErrorTypes[status.CONFLICT]);
        }

        let m3Calculated = 0;

        if (body.endStateM3 != null) {
            m3Calculated = body.endStateM3 - body.startStateM3;
        } else if (body.peopleCountSnapshot != null) {
            m3Calculated = body.peopleCountSnapshot;
        }

        const newConsumption = await Consumption.create({
            ...body,
            m3Calculated,
        });

        return {
            newConsumption,
            statusCode: status.OK,
        };
    } catch (err) {
        handleCatchError(`${ErrorPrefix.API} Error creating new consumption`, err);
    }
});
