import { Schema, model } from "mongoose";
import { IFaq } from "../interface";

const faqSchema = new Schema<IFaq>(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: undefined,
        },
    },
    { timestamps: true }
);

const Faq = model("faqs", faqSchema);

export default Faq;
