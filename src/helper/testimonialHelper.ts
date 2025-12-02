import { Testimonial } from "../model/index";
import { ITestimonial, ITestimonialPaginationResponse, ITestimonialResponse, IResponseMessage } from "../interface";
import { Document, isValidObjectId } from "mongoose";
import { removeReplacedFile } from "../utils/shortcuts";

export const getTestimonials = async (page?: string, limit?: string): Promise<ITestimonialPaginationResponse> => {
    try {
        const PAGE = parseInt(page ?? "1");
        const LIMIT = parseInt(limit ?? "10");

        const deleteQuery = { isDeleted: false };

        const findCondition = {
            ...deleteQuery,
        };

        const testimonials = await Testimonial.find(findCondition, {
            comment: 1,
            file: 1,
            name: 1,
            designation: 1,
            company: 1,
            createdAt: 1,
        })
            .sort({ createdAt: -1 })
            .limit(LIMIT === -1 ? 0 : LIMIT)
            .skip(LIMIT === -1 ? 0 : LIMIT * (PAGE - 1));

        const totalCount = await Testimonial.countDocuments(findCondition);

        return {
            message: testimonials.length ? "Testimonials fetched" : "Testimonial is empty",
            page: PAGE,
            results: testimonials,
            totalCount,
            totalPages: LIMIT === -1 ? 1 : Math.ceil(totalCount / LIMIT),
            success: true,
        };
    } catch (error: any) {
        throw {
            message: error.message || "Testimonial fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const getATestimonial = async (testimonialId: Document["_id"] | string): Promise<ITestimonialResponse> => {
    try {
        if (!testimonialId || !isValidObjectId(testimonialId)) {
            throw { message: "Please provide valid id", statusCode: 400 };
        }

        const testimonial = await Testimonial.findOne(
            { _id: testimonialId, isDeleted: false },
            {
                comment: 1,
                company: 1,
                file: 1,
                designation: 1,
                name: 1,
                createdAt: 1,
            }
        );

        if (!testimonial) throw { message: "testimonial not found", statusCode: 404 };

        return {
            message: `Testimonial fetched successfully`,
            success: true,
            result: testimonial,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Testimonial fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const addTestimonial = async (newTestimonial: ITestimonial): Promise<ITestimonialResponse> => {
    try {
        if (
            !newTestimonial.comment ||
            !newTestimonial.name ||
            !newTestimonial.file ||
            !newTestimonial.designation ||
            !newTestimonial.company
        ) {
            throw { message: "Missing fields", statusCode: 400 };
        }

        const testimonial = new Testimonial({
            comment: newTestimonial.comment,
            name: newTestimonial.name,
            file: newTestimonial.file,
            company: newTestimonial.company,
            designation: newTestimonial.designation,
        });
        const editedTestimonial = await testimonial.save();

        return {
            message: `Testimonial created successfully`,
            success: true,
            result: editedTestimonial,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Testimonial creation failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const editTestimonial = async (
    newTestimonial: ITestimonial,
    testimonialId: Document["_id"] | string
): Promise<ITestimonialResponse> => {
    try {
        if (!testimonialId || !isValidObjectId(testimonialId)) {
            throw { message: "Please provide valid id", statusCode: 400 };
        }

        const testimonial = await Testimonial.findById(testimonialId, {
            comment: 1,
            company: 1,
            file: 1,
            designation: 1,
            name: 1,
            createdAt: 1,
        });

        if (!testimonial) throw { message: "testimonial not found", statusCode: 404 };

        const { comment, name, designation, company, file } = newTestimonial;

        const oldFile = testimonial.file;

        testimonial.comment = comment || testimonial.comment;
        testimonial.name = name || testimonial.name;
        testimonial.file = file || testimonial.file;
        testimonial.designation = designation || testimonial.designation;
        testimonial.company = company || testimonial.company;

        removeReplacedFile("testimonials", oldFile, file);

        const editedTestimonial = await testimonial.save();

        return {
            message: `Testimonial edited successfully`,
            success: true,
            result: editedTestimonial,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Testimonial editing failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const deleteTestimonial = (testimonialId: Document["_id"] | string) => {
    return new Promise<IResponseMessage>(async (resolve, reject) => {
        try {
            if (!testimonialId || !isValidObjectId(testimonialId))
                throw { message: "Please provide valid id", statusCode: 400 };

            const testimonial = await Testimonial.findOne({
                _id: testimonialId,
                isDeleted: false,
            });

            if (!testimonial) throw { message: "Testimonial not found", statusCode: 404 };

            testimonial.isDeleted = true;
            testimonial.deletedAt = new Date();
            await testimonial.save();

            resolve({
                message: `Testimonial deleted successfully`,
            });
        } catch (error: any) {
            console.log(error);
            throw {
                message: error.message || "Testimonial deleting failed",
                statusCode: error.statusCode || 500,
                success: false,
            };
        }
    });
};
