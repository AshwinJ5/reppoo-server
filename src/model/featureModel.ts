import { Schema, model } from "mongoose";
import { IFeature } from "../interface";

const featureSchema = new Schema<IFeature>(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Feature = model("features", featureSchema);

export default Feature;
