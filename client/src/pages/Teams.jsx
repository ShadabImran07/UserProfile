import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeamCard = ({ team }) => {
	return (
		<div className='bg-white shadow-lg rounded-lg overflow-hidden m-4 max-w-sm'>
			<div className='px-6 py-4'>
				<div className='font-bold text-xl mb-2'>{team.teamName}</div>
				<p className='text-gray-700 text-base'>
					Number of Users: {team.numberOfUsers}
				</p>
			</div>
			<div className='px-6 py-4'>
				<Link
					to={`/team-details/${team.teamId}`} // Replace with your route
					className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
				>
					View Details
				</Link>
			</div>
		</div>
	);
};

const Teams = () => {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		// Fetch teams from the API
		const fetchTeams = async () => {
			try {
				const response = await fetch(
					"https://userprofile-backend.onrender.com/api/team/teams-details"
				);
				if (response.ok) {
					const data = await response.json();
					setTeams(data.data);
				} else {
					throw new Error("Failed to fetch teams");
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchTeams();
	}, []);

	return (
		<div className='flex flex-wrap justify-center'>
			{teams.map((team) => (
				<TeamCard
					key={team.teamId}
					team={team}
				/>
			))}
		</div>
	);
};

export default Teams;
