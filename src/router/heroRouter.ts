import { Router } from "express";
import { heroController } from "../controller";
import { uploadImage } from "../middleware/fileUpload";
import { adminAccess } from "../middleware";

const router = Router();

const { addHero, editHero, getHero } = heroController;

router
    .route("/")
    .get(getHero)
    .post(adminAccess,uploadImage("heros").fields([{ name: "hero" }, { name: "left" }, { name: "right" }]), addHero)
    .patch(adminAccess,uploadImage("heros").fields([{ name: "hero" }, { name: "left" }, { name: "right" }]), editHero);

export default router;
