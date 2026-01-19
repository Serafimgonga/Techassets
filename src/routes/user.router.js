import { Router } from "express";
import {creatPost,listPost } from "../controllers/user.controller.js";
import {createUser, listUser, findById, findByName } from "../controllers/users/user.controller.js";
const router = Router();

router.post("/users", createUser);       // criar usuário ✅
router.get("/users", listUser);          // listar todos usuários ✅

router.get("/users/search", findByName); // buscar por name ✅
router.get("/users/:id", findById);      // buscar por id ✅

router.post("/posts", creatPost);        // criar post ✅
router.get("/posts", listPost);          // listar posts ✅

export default router;
