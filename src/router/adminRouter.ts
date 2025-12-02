import { Router } from "express";
import { adminController } from "../controller";
import { adminAccess } from "../middleware";

const router = Router();

const { addAdmin, adminLogin } = adminController;

router.route("/register").post(adminAccess, addAdmin);
router.route("/login").patch(adminLogin);

export default router;
