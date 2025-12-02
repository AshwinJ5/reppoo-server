import { Router } from "express";
import { faqController } from "../controller";
import { adminAccess } from "../middleware";

const router = Router();

const { getFaqs, getAFaq, addFaq, editFaq, deleteFaq } = faqController;

router.route("/").get(getFaqs).post(addFaq);
router.route("/:fid").get(getAFaq).patch(adminAccess, editFaq).delete(adminAccess, deleteFaq);

export default router;
