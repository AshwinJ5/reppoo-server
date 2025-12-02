import { NextFunction, Request, Response } from "express";
import { faqHelper } from "../helper";
import ApiResponse from "../utils/apiResponse";

export const getFaqs = (req: Request, res: Response, next: NextFunction) => {
    faqHelper
        .getFaqs(req.query.page as string, req.query.limit as string, req.query.question as string)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const getAFaq = (req: Request, res: Response, next: NextFunction) => {
    faqHelper
        .getAFaq(req.params.fid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const addFaq = (req: Request, res: Response, next: NextFunction) => {
    faqHelper
        .addFaq(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const editFaq = (req: Request, res: Response, next: NextFunction) => {
    faqHelper
        .editFaq(req.body, req.params.fid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const deleteFaq = (req: Request, res: Response, next: NextFunction) => {
    faqHelper
        .deleteFaq(req.params.fid)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};
