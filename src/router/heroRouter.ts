import { Router } from "express";
import { heroController } from "../controller";
import { uploadImage } from "../middleware/fileUpload";

const router = Router();

const { addHero, editHero, getHero } = heroController;

router
    .route("/")
    .get(getHero)
    .post(uploadImage("heros").fields([{ name: "hero" }, { name: "left" }, { name: "right" }]), addHero)
    .patch(uploadImage("heros").fields([{ name: "hero" }, { name: "left" }, { name: "right" }]), editHero);

export default router;
