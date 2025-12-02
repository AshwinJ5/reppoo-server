import { Router } from "express";
import { testimonialController } from "../controller";
import { uploadImage } from "../middleware/fileUpload";
import { adminAccess } from "../middleware";

const router = Router();

const { getTestimonials, getATestimonial, addTestimonial, editTestimonial, deleteTestimonial } = testimonialController;

router.route("/").get(getTestimonials).post(adminAccess, uploadImage("testimonials").single("image"), addTestimonial);
router
    .route("/:tid")
    .get(getATestimonial)
    .patch(adminAccess, uploadImage("testimonials").single("image"), editTestimonial)
    .delete(adminAccess, deleteTestimonial);

export default router;
