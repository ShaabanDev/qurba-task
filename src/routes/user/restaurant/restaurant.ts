import { Request, Response, Router } from "express";
import { createRestaurant, getAllNearestRestaurants, getAllRestaurantsBasedOnCuisine } from "../../../controllers/restaurant/restaurant";

import asyncHandler from "../../../utilities/async_handler";
import createValidationError from "../../../utilities/validation_error_handling";
import { validateRestaurantInputs } from "../../../validation/requests_inputs_validation";

const router = Router();


router.post(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const owner_uid = req.useruid;
        const object = req.body.object;
        const { payload, errors } = await validateRestaurantInputs(
            object
        );
        if (errors || !payload) throw createValidationError(errors);
        const newRestaurant = await createRestaurant(
            payload, owner_uid
        )
        return res.send(newRestaurant);
    })
);



router.get(
    "/details/:cuisine",
    asyncHandler(async (req: Request, res: Response) => {
        const cuisine = req.params.cuisine;

        const restaurants = await getAllRestaurantsBasedOnCuisine(cuisine)
        return res.send(restaurants);
    })
);


router.get(
    "/nearest/",
    asyncHandler(async (req: Request, res: Response) => {
        const { longitude, latitude } = req.query
        console.log(longitude, latitude)
        const restaurants = await getAllNearestRestaurants({
            longitude: Number(longitude), latitude: Number(latitude)
        })
        return res.send(restaurants);
    })
);


router.get(
    "/:cuisine",
    asyncHandler(async (req: Request, res: Response) => {
        const cuisine = req.params.cuisine;

        const restaurants = await getAllRestaurantsBasedOnCuisine(cuisine)
        return res.send(restaurants);
    })
);

export default router;
