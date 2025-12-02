import { NextFunction, Request, Response } from "express";
import { featureHelper } from "../helper";
import ApiResponse from "../utils/apiResponse";

export const getFeature = (req: Request, res: Response, next: NextFunction) => {
    featureHelper
        .getFeature()
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const addFeature = (req: Request, res: Response, next: NextFunction) => {
    req.body.image = req.file ? req.file.filename : null;
    featureHelper
        .addFeature(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const editFeature = (req: Request, res: Response, next: NextFunction) => {
    req.body.image = req.file ? req.file.filename : null;
    featureHelper
        .editFeature(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};
