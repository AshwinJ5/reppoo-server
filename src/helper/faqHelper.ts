import { Faq } from "../model/index";
import { IFaq, IFaqPaginationResponse, IFaqResponse, IResponseMessage } from "../interface";
import { Document, isValidObjectId } from "mongoose";

export const getFaqs = async (
    page?: string,
    limit?: string,
    question?: string
): Promise<IFaqPaginationResponse> => {
    try {
        const PAGE = parseInt(page ?? "1");
        const LIMIT = parseInt(limit ?? "10");

        const questionQuery = question ? { question: new RegExp(question, "i") } : {};
        const deleteQuery = { isDeleted: false };

        const findCondition = {
            ...questionQuery,
            ...deleteQuery,
        };

        const faqs = await Faq.find(
            findCondition,
            {
                question: 1,
                answer: 1,
                createdAt: 1,
            }
        )
            .sort({ createdAt: -1 })
            .limit(LIMIT === -1 ? 0 : LIMIT)
            .skip(LIMIT === -1 ? 0 : LIMIT * (PAGE - 1));

        const totalCount = await Faq.countDocuments(findCondition);

        return {
            message: faqs.length ? "Faqs fetched" : "Faq is empty",
            page: PAGE,
            results: faqs,
            totalCount,
            totalPages: LIMIT === -1 ? 1 : Math.ceil(totalCount / LIMIT),
            success: true,
        };
    } catch (error: any) {
        throw {
            message: error.message || "Faq fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};


export const getAFaq = async (faqId: Document["_id"] | string): Promise<IFaqResponse> => {
    try {
        if (!faqId || !isValidObjectId(faqId)) {
            throw { message: "Please provide valid id", statusCode: 400 };
        }

        const faq = await Faq.findOne(
            { _id: faqId, isDeleted:false },
            {
                question: 1,
                answer: 1,
                createdAt: 1,
            }
        );

        if (!faq) throw { message: "faq not found", statusCode: 404 };

        return {
            message: `Faq fetched successfully`,
            success: true,
            result: faq,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Faq fetching failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const addFaq = async (newFaq: IFaq): Promise<IFaqResponse> => {
    try {
        if (!newFaq.question || !newFaq.answer) {
            throw { message: "Missing fields", statusCode: 400 };
        }

        const exists = await Faq.findOne({
            $or: [{ question: newFaq.question.toLowerCase() }],
            isDeleted: false,
        });

        if (exists) throw { message: "Faq already exists", statusCode: 400 };

        const faq = new Faq({
            question: newFaq.question,
            answer: newFaq.answer,
        });
        const editedFaq = await faq.save();

        return {
            message: `Faq created successfully`,
            success: true,
            result: editedFaq,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Faq creation failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const editFaq = async (newFaq: IFaq, faqId: Document["_id"] | string): Promise<IFaqResponse> => {
    try {
        if (!faqId || !isValidObjectId(faqId)) {
            throw { message: "Please provide valid id", statusCode: 400 };
        }

        const faq = await Faq.findById(faqId, {
            question: 1,
            answer: 1,
            createdAt: 1,
        });

        if (!faq) throw { message: "faq not found", statusCode: 404 };

        const { question, answer } = newFaq;

        if (question && faq.question != question) {
            const faqExists = await Faq.findOne({ question });
            if (faqExists) throw { message: "Question already exists", statusCode: 404 };
        }

        faq.question = question || faq.question;
        faq.answer = answer || faq.answer;

        const editedFaq = await faq.save();

        return {
            message: `Faq edited successfully`,
            success: true,
            result: editedFaq,
        };
    } catch (error: any) {
        console.log(error);
        throw {
            message: error.message || "Faq editing failed",
            statusCode: error.statusCode || 500,
            success: false,
        };
    }
};

export const deleteFaq = (faqId: Document["_id"] | string) => {
    return new Promise<IResponseMessage>(async (resolve, reject) => {
        try {
            if (!faqId || !isValidObjectId(faqId)) throw { message: "Please provide valid id", statusCode: 400 };

            const faq = await Faq.findOne({
                _id: faqId,
                isDeleted: false,
            });

            if (!faq) throw { message: "Faq not found", statusCode: 404 };

            faq.isDeleted = true;
            faq.deletedAt = new Date();
            await faq.save();

            resolve({
                message: `Faq deleted successfully`,
            });
        } catch (error: any) {
            console.log(error);
            throw {
                message: error.message || "Faq deleting failed",
                statusCode: error.statusCode || 500,
                success: false,
            };
        }
    });
};
