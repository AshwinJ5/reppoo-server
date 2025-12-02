import { Schema, model } from "mongoose";
import { IHero } from "../interface";

const heroSchema = new Schema<IHero>(
    {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        heroImage: {
            type: String,
            required: true,
        },
        leftCardImage: {
            type: String,
            required: true,
        },
        rightCardImage: {
            type: String,
            required: true,
        },
        totalUsers: {
            type: Number,
            required: true,
        },
        ios: {
            type: String,
            required: true,
        },
        android: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Hero = model("heros", heroSchema);

export default Hero;
