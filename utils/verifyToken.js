import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const token = req?.cookies?.access_token || null;
	if (!token) {
		return res.status(401).render("error");
	}
	jwt.verify(token, process.env.JWT_SECRETE, (err, user) => {
		if (err) {
			return res.status(400).send(err);
		}
		req.user = user;
		next();
	});
};
