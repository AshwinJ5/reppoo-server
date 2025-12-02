import { Schema, model } from "mongoose";
import { ITestimonial } from "../interface";

const testimonialSchema = new Schema<ITestimonial>(
    {
        comment: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        company: {
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

const Testimonial = model("testimonials", testimonialSchema);

export default Testimonial;
