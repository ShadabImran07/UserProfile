import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TeamShowPage = () => {
	const [teamDetails, setTeamDetails] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchTeamDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/team/teams-details/${id}`
				);
				if (response.ok) {
					const data = await response.json();
					setTeamDetails(data.data);
				} else {
					throw new Error("Failed to fetch team details");
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchTeamDetails();
	}, [id]);

	return (
		<div className='max-w-4xl mx-auto px-4 py-8'>
			{teamDetails ? (
				<div>
					<h2 className='text-2xl font-bold mb-4'>{teamDetails.teamName}</h2>
					<div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
						{teamDetails.users.map((user, index) => (
							<div
								key={index}
								className='bg-white shadow-md p-6 rounded-lg'
							>
								<h3 className='text-lg font-semibold mb-4'>{user.name}</h3>
								<p className='mb-2'>Email: {user.email}</p>
								<p className='mb-2'>Domain: {user.domain}</p>
								<p className='mb-2'>Gender: {user.gender}</p>
							</div>
						))}
					</div>
					<div className='mb-4 p-10'>
						<Link
							to='/'
							className='bg-sky-500 text-white px-4 py-2 rounded-md'
						>
							Go Home
						</Link>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default TeamShowPage;
