import type { ErrorCode } from '../constants/error';
export declare class InvalidError extends Error {
    errorCode: ErrorCode;
    constructor(errorCode: ErrorCode);
}
