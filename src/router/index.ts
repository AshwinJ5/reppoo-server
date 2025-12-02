import express from "express";
import  adminRouter  from "./adminRouter";
import  faqRouter  from "./faqRouter";
import  testimonialRouter  from "./testimonialRouter";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/faq", faqRouter);
router.use("/testimonial", testimonialRouter);

export default router;
