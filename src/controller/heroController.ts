import { NextFunction, Request, Response } from "express";
import { heroHelper } from "../helper";
import ApiResponse from "../utils/apiResponse";

export const getHero = (req: Request, res: Response, next: NextFunction) => {
    heroHelper
        .getHero()
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const addHero = (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;
    req.body.heroImage = files?.hero ? files.hero[0].filename : null;
    req.body.leftCardImage = files?.left ? files.left[0].filename : null;
    req.body.rightCardImage = files?.right ? files.right[0].filename : null;
    heroHelper
        .addHero(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};

export const editHero = (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;
    req.body.heroImage = files?.hero ? files.hero[0].filename : null;
    req.body.leftCardImage = files?.left ? files.left[0].filename : null;
    req.body.rightCardImage = files?.right ? files.right[0].filename : null;
    heroHelper
        .editHero(req.body)
        .then((response) => {
            res.status(200).json(new ApiResponse(200, response.result, response.message));
        })
        .catch((error: any) => {
            next(error);
        });
};
