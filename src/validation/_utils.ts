import { ObjectSchema, ValidationError } from "joi";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * ValidationRequest is a helper class to validate a request.
 */
export interface ValidationResult<T> {
    /**
     * The validated data.
     */
    payload?: T;
    /**
     * The validation error.
     */
    errors?: string[] | any;
}

export const validationRequest = async function <T>(
    payload: T,
    schema: ObjectSchema<T>
): Promise<ValidationResult<T>> {
    try {
        const data = await schema.validateAsync(payload, {
            abortEarly: false,
        });
        return {
            payload: data,

            errors: undefined,
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            const errors = serializeValidationErrors(error);
            return {
                payload: undefined,
                errors: errors,
            };
        }
        return {
            payload: undefined,
            errors: error,
        };
    }
};

export const serializeValidationErrors = function (
    error: ValidationError
): Array<string> {
    return error.details.map((detail) => detail.message);
};
