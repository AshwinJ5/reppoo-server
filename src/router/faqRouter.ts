import { Router } from "express";
import { faqController } from "../controller";

const router = Router();

const { getFaqs, getAFaq, addFaq, editFaq, deleteFaq } = faqController;

router.route("/").get(getFaqs).post(addFaq);
router.route("/:fid").get(getAFaq).patch(editFaq).delete(deleteFaq);

export default router;
