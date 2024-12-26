import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	const { username, email, password } = req.body;
	if (!username || !email || !password) {
		return res.status(400).send("All fields are reqired");
	}
	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).send("User already exist");
	}

	const hashPassword = bcryptjs.hashSync(password, 10);
	try {
		const newUser = await User.create({
			username,
			email,
			password: hashPassword,
		});
		await newUser.save();
		return res.send(newUser);
	} catch (error) {
		return res.status(400);
	}
};

export const signin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send("All fields are required");
	}
	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return res.status(401).send("user not found");
		}
		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) {
			return res.status(400).send("Invalid Padssword");
		}
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRETE, {
			expiresIn: "30d",
		});
		const { password: pass, ...rest } = validUser._doc;
		return res
			.status(200)
			.cookie("access_token", token, { httpOnly: true })
			.send(rest);
	} catch (error) {
		return res.status(500).send(error);
	}
};

export const signout = async (req, res) => {
	try {
		res
			.clearCookie("access_token")
			.status(200)
			.json("user has been signed out");
	} catch (error) {
		next(error);
	}
};
