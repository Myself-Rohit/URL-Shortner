import express from "express";
import {
	getAllUrl,
	getShortUrl,
	generateShortUrl,
	removeShortUrl,
} from "../controllers/url.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getAllUrl);
router.post("/", verifyToken, generateShortUrl);
router.get("/:id", getShortUrl);
router.delete("/:id", verifyToken, removeShortUrl);

export default router;
