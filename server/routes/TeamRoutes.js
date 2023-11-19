// Express Route for creating a team
import express from "express";
import Team from "../mongodb/models/Team.js";

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

export default router;
