import express from "express";
import {
	getAllUrl,
	getShortUrl,
	generateShortUrl,
	removeShortUrl,
} from "../controllers/url.controller.js";
const router = express.Router();

router.get("/", getAllUrl);
router.post("/", generateShortUrl);
router.get("/:id", getShortUrl);
router.delete("/:id", removeShortUrl);
export default router;
