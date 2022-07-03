import mongoose, { Schema, Document } from "mongoose";

const userSchema: Schema = new Schema(
    {
        full_name: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        rid: {
            type: String,
        },
        favorite_cuisines: [String]
    },
    {
        timestamps: true,
    }
);

export interface IUser {
    full_name: string;
    uid: string;
    rid: string
    favorite_cuisines: [string];
}

export interface UserSchemaDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}


export default mongoose.model<UserSchemaDocument>(
    "Users",
    userSchema
);
