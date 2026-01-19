import { Router } from "express";
import { creatUser, listUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/users", creatUser);
router.get("/users", listUser);

export default router;
