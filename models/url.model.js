import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
	{
		urlname: {
			type: String,
			unique: true,
			required: true,
		},
		shortId: {
			type: String,
			unique: true,
			required: true,
		},
		redirectUrl: {
			type: String,
			required: true,
		},
		visitHistory: [{ timestamps: { type: Number } }],
	},
	{ timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
export default URL;
