import { Router } from "express";
import { testimonialController } from "../controller";
import { uploadImage } from "../middleware/fileUpload";

const router = Router();

const { getTestimonials, getATestimonial, addTestimonial, editTestimonial, deleteTestimonial } = testimonialController;

router.route("/").get(getTestimonials).post(uploadImage("testimonials").single("image"), addTestimonial);
router
    .route("/:tid")
    .get(getATestimonial)
    .patch(uploadImage("testimonials").single("image"), editTestimonial)
    .delete(deleteTestimonial);

export default router;
