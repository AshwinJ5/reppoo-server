import { Document } from "mongoose";

export interface IHero extends Document {
    title: string;
    subtitle: string;
    heroImage: string;
    leftCardImage: string;
    rightCardImage: string;
    totalUsers: number;
    ios: string;
    android: string;
}

export interface IHeroResponse {
    message: string;
    success: boolean;
    result?: IHero;
}
