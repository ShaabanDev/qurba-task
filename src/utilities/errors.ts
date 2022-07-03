/**
 * Attached to any error that is thrown by the application due to
 * and internal process.
 */
export const INTERNAL_ERROR_CODE = "INTERNAL_ERROR";

export const EXTERNAL_ERROR_CODE = "EXTERNAL_ERROR";

/**
 * Interface for `BaseAppErrorParams` error.
 *
 * @param code - Error code.
 * @param message - Error message.
 * @param status - HTTP status code.
 * @param details - Error details if any.
 */
export interface BaseAppErrorParams {
    code: string;
    message?: string;
    status?: number;
    details?: string;
}

/**
 * Generic error class to be used instead of the default `Error`.
 *
 * @param {BaseAppErrorParams} params
 */
export abstract class BaseAppError extends Error {
    public code: string;
    public status?: number;

    constructor(data: BaseAppErrorParams) {
        super(data.message ?? data.details);
        this.code = data.code;
        this.status = data.status;
    }
}

/**
 * Thrown when an error occurs in the application.
 *
 * @param {string} details The error details.
 * @param {string} code The error code, default to `INTERNAL_ERROR_CODE`.
 *
 */