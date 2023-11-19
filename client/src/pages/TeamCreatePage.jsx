import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamCreatePage = () => {
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [teamName, setTeamName] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedDomains, setSelectedDomains] = useState(new Set());
	const [userAvailability, setUserAvailability] = useState({});
	const [alertMessage, setAlertMessage] = useState("");

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const response = await fetch("http://localhost:8080/api/user/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				const result = await response.json();
				setUsers(result.data.reverse());
				// Store availability data for each user
				const availabilityData = {};
				result.data.forEach((user) => {
					availabilityData[user._id] = user.available;
				});
				setUserAvailability(availabilityData);
			}
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleUserSelection = (userId, userDomain, userAvailable) => {
		if (selectedDomains.has(userDomain)) {
			setAlertMessage("Domain already chosen!");
		} else if (!userAvailable) {
			setAlertMessage("User not available!");
		} else {
			setAlertMessage("");
			setSelectedDomains(new Set(selectedDomains.add(userDomain)));
			setSelectedUsers([...selectedUsers, userId]);
		}
	};

	const createTeam = () => {
		// Send selected users and team name to backend
		fetch("http://localhost:8080/api/team/create-team", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ teamName, selectedUsers }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to create team");
				}
				console.log("Team created successfully");
				navigate("/");
				// Handle success (e.g., show a success message)
			})
			.catch((error) => {
				console.error("Error creating team:", error);
				// Handle error (e.g., show an error message)
			});
	};

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>Create Team</h1>
			<input
				type='text'
				placeholder='Enter team name'
				value={teamName}
				onChange={(e) => setTeamName(e.target.value)}
				className='border border-gray-300 rounded px-2 py-1 mb-4'
			/>
			<div className='flex flex-col space-y-2'>
				{users.map((user) => (
					<div
						key={user._id}
						className='flex items-center justify-between'
					>
						<span>
							{user.first_name} {user.last_name} ({user.domain}){" "}
							{userAvailability[user._id] ? "(Available)" : "(Not Available)"}
						</span>
						<button
							disabled={
								selectedUsers.includes(user._id) || !userAvailability[user._id]
							}
							onClick={() =>
								handleUserSelection(
									user._id,
									user.domain,
									userAvailability[user._id]
								)
							}
							className={`px-3 py-1 rounded ${
								selectedUsers.includes(user._id)
									? "bg-gray-300 cursor-not-allowed"
									: userAvailability[user._id]
									? "bg-green-500 hover:bg-green-600"
									: "bg-red-500 hover:bg-red-600"
							}`}
						>
							{selectedUsers.includes(user._id) ? "Selected" : "Select"}
						</button>
					</div>
				))}
			</div>
			{alertMessage && <div className='text-red-500'>{alertMessage}</div>}
			<button
				onClick={createTeam}
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
			>
				Create Team
			</button>
		</div>
	);
};

export default TeamCreatePage;
