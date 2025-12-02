import { NextFunction, Request, Response } from "express";
import { testimonialHelper } from "../helper";
import ApiResponse from "../utils/apiResponse";

export const getTestimonials = (req: Request, res: Response, next: NextFunction) => {
    testimonialHelper
        .getTestimonials(req.query.page as string, req.query.limit as string)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const getATestimonial = (req: Request, res: Response, next: NextFunction) => {
    testimonialHelper
        .getATestimonial(req.params.tid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const addTestimonial = (req: Request, res: Response, next: NextFunction) => {
    req.body.file = req.file ? req.file.filename : null;
    testimonialHelper
        .addTestimonial(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const editTestimonial = (req: Request, res: Response, next: NextFunction) => {
    req.body.file = req.file ? req.file.filename : null;
    testimonialHelper
        .editTestimonial(req.body, req.params.tid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const deleteTestimonial = (req: Request, res: Response, next: NextFunction) => {
    testimonialHelper
        .deleteTestimonial(req.params.tid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};
