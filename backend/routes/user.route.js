import express from "express";
import {register, login, updateProfile, logout} from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router(); // importing router from express to establish routes

router.route("/register").post(singleUpload ,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile); // this defines that isauthencited function will occur before updateProfile

export default router;