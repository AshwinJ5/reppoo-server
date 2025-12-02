import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

export const uploadImage = (folderName: string) => {
    const uploadPath = path.join("uploads", folderName);
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
            cb(null, uniqueName);
        },
    });

    const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);

        if (ext && mime) cb(null, true);
        else cb(new Error("Only image files are allowed!"));
    };

    return multer({
        storage,
        fileFilter: imageFilter,
        limits: { fileSize: 5 * 1024 * 1024 },
    });
};
