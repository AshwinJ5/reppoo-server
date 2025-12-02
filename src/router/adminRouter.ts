import { Router } from "express";
import { adminController } from "../controller";

const router = Router();

const { addAdmin, adminLogin } = adminController;

router.route("/register").post(addAdmin);
router.route("/login").patch(adminLogin);

export default router;
