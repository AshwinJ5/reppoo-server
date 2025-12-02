import { Document } from "mongoose";

export interface IFaq extends Document{
    question: string;
    answer: string;
    isDeleted: boolean;
    deletedAt: Date;
}

export interface IFaqResponse {
    message: string;
    success: boolean;
    result?: IFaq;
}

export interface IFaqPaginationResponse {
    message: string;
    success: boolean;
    results?: IFaq[];
    page: number;
    totalPages: number;
    totalCount: number;
}
