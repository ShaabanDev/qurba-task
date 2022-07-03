
import User, { } from '../../models/user_model'

import { IUserInputs } from '../../interfaces/user'
import { generateId } from '../../utilities/_utils'



export const createUser = async (
    userInputs: IUserInputs,
) => {
    const newRandomId = generateId({
        uid: true
    })
    const newUser = new User({ ...userInputs, uid: newRandomId })

    await newUser.save()
    return newUser
}


export const deleteUser = async (
    useruid: string,
) => {
    const deleteUser = await User.findOneAndDelete({
        uid: useruid
    })
    return deleteUser
}


export const updateUser = async (
    userInputs: IUserInputs, useruid: string,
) => {
    const existingUser = await User.findOneAndUpdate({
        uid: useruid
    }, {
        full_name: userInputs.full_name,
        $addToSet: {
            favorite_cuisines: { $each: userInputs.favorite_cuisines }
        }
    }, {
        new: true
    })
    return existingUser
}

export const fetchUser = async (
    useruid: string,
) => {
    const existingUser = await User.findOne({
        uid: useruid
    })

    return existingUser
}


export const getUsersForASpecificCuisine = async (cuisine: string) => {
    const users = await User.aggregate([{
        $addFields: {
            match: {
                $size: {
                    $filter: {
                        input: '$favorite_cuisines',
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
        $match: {
            match: 1
        }
    }, {
        $lookup: {
            from: 'restaurants',
            localField: 'uid',
            foreignField: 'owner_uid',
            as: 'restaurants'
        }
    }, {
        $unwind: {
            path: '$restaurants'
        }
    }, {
        $addFields: {
            exist: {
                $size: {
                    $filter: {
                        input: '$restaurants.cuisine',
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
        $match: {
            match: 1,
            exist: 1
        }
    }, {
        $project: {
            match: 0,
            exist: 0,
            restaurants: 0
        }
    }])

    return users
} 