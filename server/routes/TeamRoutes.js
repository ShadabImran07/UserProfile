// Express Route for creating a team
import express from "express";
import Team from "../mongodb/models/Team.js";
import User from "../mongodb/models/user.js";
const router = express.Router();

router.route("/create-team").post(async (req, res) => {
	const { teamName, selectedUsers } = req.body;

	try {
		const newTeam = new Team({
			teamName,
			selectedUsers,
		});

		await newTeam.save();
		res.status(200).json({ message: "Team created successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Could not create team" });
	}
});
router.route("/teams-details").get(async (req, res) => {
	try {
		// Fetch teams and populate the 'selectedUsers' field to get the number of users
		const teams = await Team.find({}).populate("selectedUsers", "_id");
		console.log(teams);
		// Extract team details
		const teamDetails = teams.map((team) => {
			return {
				teamId: team._id,
				teamName: team.teamName,
				numberOfUsers: team.selectedUsers.length,
			};
		});
		res.status(200).json({ success: true, data: teamDetails });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});
router.get("/teams-details/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Fetch team details by ID
		const team = await Team.findById(id).populate({
			path: "selectedUsers",
			select: "first_name last_name email domain gender", // Fields to select from User model
		});

		if (!team) {
			return res.status(404).json({ success: false, error: "Team not found" });
		}

		const users = team.selectedUsers.map((user) => ({
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			domain: user.domain,
			gender: user.gender,
		}));

		const teamDetails = {
			teamId: team._id,
			teamName: team.teamName,
			users: users,
		};
		res.status(200).json({ success: true, data: teamDetails });
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
});

export default router;
