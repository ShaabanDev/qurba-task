import { Request, Response, Router } from "express";
import { fetchUser, updateUser } from "../../../controllers/user/user";

import asyncHandler from "../../../utilities/async_handler";
import createValidationError from "../../../utilities/validation_error_handling";
import { validateUserInputs } from "../../../validation/requests_inputs_validation";

const router = Router();


router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const useruid = req.useruid;

        const user = await fetchUser(useruid)
        return res.send(user);
    })
);


router.put(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const useruid = req.useruid;
        const object = req.body.object;
        const { payload, errors } = await validateUserInputs(
            object
        );
        if (errors || !payload) throw createValidationError(errors);
        const updatedUser = await updateUser(
            payload, useruid
        )
        return res.send(updatedUser);
    })
);



export default router;
