import { Router } from "express";
import { featureController } from "../controller";
import { uploadImage } from "../middleware/fileUpload";
import { adminAccess } from "../middleware";

const router = Router();

const { addFeature, editFeature, getFeature } = featureController;

router
    .route("/")
    .get(adminAccess,getFeature)
    .post(adminAccess, uploadImage("features").single("image"), addFeature)
    .patch(adminAccess, uploadImage("features").single("image"), editFeature);

export default router;
