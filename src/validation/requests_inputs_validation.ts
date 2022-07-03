/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

import { validationRequest, ValidationResult } from "./_utils";

import { IRestaurantInputs } from '../interfaces/restaurant'
import { IUserInputs } from '../interfaces/user'

export const validateRestaurantInputs = async (
    payload: any
): Promise<ValidationResult<IRestaurantInputs>> => {
    const schema = Joi.object({
        name: Joi.string().required(),
        unique_name: Joi.string().required(),
        location: Joi.object({
            type: Joi.string().required(),
            coordinates: Joi.array().items(Joi.number().precision(8).required())
        }).required(),
        cuisine: Joi.array().items(Joi.string())
    }).options({
        abortEarly: false,
    });

    return validationRequest<IRestaurantInputs>(payload, schema);
};


export const validateUserInputs = async (
    payload: any
): Promise<ValidationResult<IUserInputs>> => {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        favorite_cuisines: Joi.array().items(Joi.string())
    }).options({
        abortEarly: false,
    });

    return validationRequest<IUserInputs>(payload, schema);
};