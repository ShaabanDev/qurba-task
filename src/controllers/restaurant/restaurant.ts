
import Restaurant, { } from '../../models/restaurant_model'

import { IRestaurantInputs } from '../../interfaces/restaurant'
import { generateId } from '../../utilities/_utils'



export const createRestaurant = async (
    restaurantInputs: IRestaurantInputs, uid: string
) => {

    const newRestaurant = new Restaurant({ ...restaurantInputs, owner_uid: uid })
    const newRandomId = generateId({
        rid: true
    })
    newRestaurant.rid = newRandomId
    await newRestaurant.save()
    return newRestaurant
}


export const getAllRestaurantsBasedOnCuisine = async (
    cuisine: string
) => {
    const restaurants = await Restaurant.aggregate([{
        $addFields: {
            match: {
                $size: {
                    $filter: {
                        input: '$cuisine',
                        as: 'cuisine',
                        cond: {
                            $eq: [
                                '$$cuisine',
                                cuisine
                            ]
                        }
                    }
                }
            }
        }
    }, {
        $sort: {
            match: -1
        }
    }, {
        $project: {
            match: 0
        }
    }])

    return restaurants
}


export const getAllNearestRestaurants = async (
    location: {
        longitude: number,
        latitude: number
    }
) => {
    const { longitude, latitude } = location
    const restaurants = await Restaurant.find(
        {
            location:
            {
                $nearSphere:
                {
                    $geometry: { type: "Point", coordinates: [longitude, latitude] },
                    $maxDistance: 1000
                }
            }
        }
    )

    return restaurants
}

