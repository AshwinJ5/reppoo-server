import express from "express";
import  adminRouter  from "./adminRouter";
import  faqRouter  from "./faqRouter";
import  testimonialRouter  from "./testimonialRouter";
import  heroRouter  from "./heroRouter";
import  featureRouter  from "./featureRouter";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/faq", faqRouter);
router.use("/testimonial", testimonialRouter);
router.use("/hero", heroRouter);
router.use("/feature", featureRouter);

export default router;
