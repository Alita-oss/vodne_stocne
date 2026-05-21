import status from 'http-status';

export enum ErrorPrefix {
    API = '[API ERROR]',
    APP = '[APP ERROR]',
}

export const ErrorTypes = {
    [status.NOT_FOUND]: 'Not found',
    [status.INTERNAL_SERVER_ERROR]: 'Internal server error',
    [status.BAD_REQUEST]: 'Bad request',
    [status.PRECONDITION_FAILED]: 'Precondition failed',
    [status.CONFLICT]: 'Conflict',
};
