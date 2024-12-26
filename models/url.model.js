import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
	{
		urlname: {
			type: String,
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
		userId: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
export default URL;
