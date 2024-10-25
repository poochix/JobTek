import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/getAppliedJobs").get(isAuthenticated, getAppliedJobs);
router.route("/:id/getApplicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);

export default router


