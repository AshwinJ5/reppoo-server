import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/apiResponse";
import { buildFileUrl } from "../helper/fileHelper";

export const uploadSingle = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) throw { message: "Image is required", statusCode: 400 };

        const folder = req.params.folder;
        const fileUrl = buildFileUrl(folder, req.file.filename);

        res.status(201).json(new ApiResponse(201, { url: fileUrl }, "File uploaded"));
    } catch (err) {
        next(err);
    }
};

export const uploadMultiple = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.files || !(req.files as Express.Multer.File[]).length)
            throw { message: "No files uploaded", statusCode: 400 };

        const folder = req.params.folder;

        const urls = (req.files as Express.Multer.File[]).map((file) =>
            buildFileUrl(folder, file.filename)
        );

        res.status(201).json(new ApiResponse(201, { urls }, "Files uploaded"));
    } catch (err) {
        next(err);
    }
};
    