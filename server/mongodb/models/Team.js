// Team Model
import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
	teamName: String,
	selectedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Assuming you have a User model
		},
	],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
