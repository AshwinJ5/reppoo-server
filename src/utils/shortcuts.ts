import fs from "fs";
import path from "path";

export const removeReplacedFile = (folder: string, oldFile?: string | null, newFile?: string | null) => {
    try {
        if (!oldFile) return;

        if (!newFile || oldFile === newFile) return;

        const filePath = path.join("uploads", folder, oldFile);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted old file: ${filePath}`);
        }
    } catch (error) {
        console.log("File removal failed:", error);
    }
};
