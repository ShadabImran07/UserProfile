import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/:currentPage").get(async (req, res) => {
	const { currentPage } = req.params;
	try {
		let page = currentPage;
		let limit = 20;
		let skip = (page - 1) * limit;
		const posts = await User.find({}).skip(skip).limit(limit);
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Fetching posts failed, please try again",
		});
	}
});
router.route("/users").get(async (req, res) => {
	try {
		const posts = await User.find({});
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Fetching posts failed, please try again",
		});
	}
});

router.route("/").post(async (req, res) => {
	try {
		const { first_name, last_name, email, gender, domain, available, avatar } =
			req.body;
		const photoUrl = await cloudinary.uploader.upload(avatar);
		const newUser = await User.insertMany({
			first_name,
			last_name,
			email,
			gender,
			domain,
			available,
			avatar: photoUrl.url,
		});
		console.log(newUser);

		res.status(200).json({ success: true, data: newUser });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Unable to create a User, please try again",
		});
	}
});

router.route("/show/:id").get(async (req, res) => {
	try {
		const { id } = req.params;
		const posts = await User.findById(id);
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "Fetching posts failed, please try again",
		});
	}
});
router.route("/:id").delete(async (req, res) => {
	try {
		const { id } = req.params;
		const posts = await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "user deleteing failed, please try again",
		});
	}
});
router.route("/edit-user/:id").patch(async (req, res) => {
	try {
		const { id } = req.params;
		const { first_name, last_name, email, gender, domain, available, avatar } =
			req.body;
		console.log(last_name);
		const posts = await User.findById(id);
		const photoUrl = await cloudinary.uploader.upload(avatar);
		console.log("post ", first_name);

		posts.first_name = first_name;
		posts.last_name = last_name;
		posts.email = email;
		posts.gender = gender;
		posts.avatar = photoUrl.url;
		posts.domain = domain;
		posts.available = available;

		await posts.save();
		console.log("after", posts);

		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(500).json({
			success: false,
			message: "user editing failed, please try again",
		});
	}
});

export default router;
