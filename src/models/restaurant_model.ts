import mongoose, { Schema, Document } from "mongoose";

const restaurantSchema: Schema = new Schema(
    {
        unique_name: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        rid: {
            type: String,
            index: true,
            unique: true,
        },
        owner_uid: {
            type: String,
            index: true
        },
        location: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: {
                type: [Number],
            },

        },
        cuisine: [String]
    },
    {
        timestamps: true,
    }
);

restaurantSchema.index({
    location: "2dsphere"
})

export interface Restaurant {
    unique_name: string;
    owner_uid: string;
    name: string;
    rid: string;
    location: {
        type: string,
        coordinates: [Number]
    };
    cuisine: [string];
}

export interface RestaurantSchemaDocument extends Restaurant, Document {
    createdAt: Date;
    updatedAt: Date;
}


export default mongoose.model<RestaurantSchemaDocument>(
    "Restaurant",
    restaurantSchema
);
