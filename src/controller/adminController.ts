import { NextFunction, Request, Response } from "express";
import { adminHelper } from "../helper";
import ApiResponse from "../utils/apiResponse";

export const addAdmin = (req: Request, res: Response, next: NextFunction) => {
    adminHelper
        .addAdmin(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const adminLogin = (req: Request, res: Response, next: NextFunction) => {
    adminHelper
        .adminLogin(req.body.username, req.body.email, req.body.phone, req.body.password)
        .then(async ({ message, result }) => {
            res.status(200).json({
                success: true,
                message,
                result: { token: result },
            });
        })
        .catch((error: any) => {
            next(error);
        });
};
