import { BaseAppError } from "./errors";

class ValidationError extends BaseAppError {
    public errors: string[] | object;
    constructor(error: IValidationError) {
        super({
            code: "VALIDATION_ERROR",
            message: error.message ?? "Validation error",
            status: error.statusCode ?? 422,
        });
        this.errors = error.error;
    }
}
export interface IValidationError {
    error: string[] | object;
    statusCode?: 422 | 400 | 409;
    message?: string;
}

const createValidationError = function (
    validationError: IValidationError | string[]
) {
    if (validationError instanceof Array) {
        return new ValidationError({
            error: validationError,
        });
    }
    return new ValidationError(validationError);
};

export default createValidationError;
