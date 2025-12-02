import { Document } from "mongoose";

export interface IFeature extends Document{
    title: string;
    subtitle: string;
    description: string;
    image: string;
}

export interface IFeatureResponse {
    message: string;
    success: boolean;
    result?: IFeature;
}
