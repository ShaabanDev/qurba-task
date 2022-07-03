import { Request, Response, Router } from "express";
import { createUser } from "../../../controllers/user/user";

import asyncHandler from "../../../utilities/async_handler";
import createValidationError from "../../../utilities/validation_error_handling";
import { validateUserInputs } from "../../../validation/requests_inputs_validation";

const router = Router();


router.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const object = req.body.object;
        const { payload, errors } = await validateUserInputs(
            object
        );
        if (errors || !payload) throw createValidationError(errors);
        const newUser = await createUser(
            payload
        )
        return res.send(newUser);
    })
);


export default router;
