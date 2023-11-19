import mongoose from "mongoose";

// Define the schema for the user
const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	email: {
		type: String,
	},
	gender: {
		type: String,
		enum: ["male", "female", "other"], // Adjust the enum values as needed
	},
	avatar: {
		type: String,
		required: true,
	},
	domain: {
		type: String,
	},
	available: {
		type: Boolean,
		default: false, // Set default value if not provided
	},
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);
export default User;
