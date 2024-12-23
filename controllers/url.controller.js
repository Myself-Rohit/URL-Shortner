import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export async function generateShortUrl(req, res) {
	if (!req.body.url) return res.status(400).json({ error: "url is required" });
	const shortURL = nanoid(8);
	const newUrl = await URL.create({
		urlname: req.body.urlname,
		shortId: shortURL,
		redirectUrl: req.body.url,
		visitHistory: [],
	});
	const allUrl = await URL.find({});
	return res.render("home", { url: allUrl });
}

export async function getShortUrl(req, res) {
	const shortId = req.params.id;
	const entry = await URL.findOneAndUpdate(
		{ shortId },
		{
			$push: {
				visitHistory: {
					timestamps: Date.now(),
				},
			},
		}
	);
	if (!entry) {
		return res.send(`No url found with id ${shortId}`);
	}
	res.redirect(entry.redirectUrl);
}

export async function getAllUrl(req, res) {
	const allUrl = await URL.find({});
	return res.render("home", { url: allUrl });
}

export async function removeShortUrl(req, res) {
	const url = await URL.findOne({ shortId: req.body.shortId });
	await URL.findByIdAndDelete(url._id);
	return res.status(200).send("url deleted successfully");
}
