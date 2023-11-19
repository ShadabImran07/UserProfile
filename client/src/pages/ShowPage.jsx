import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ShowPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const deleteHandle = async () => {
		const response = await fetch(`http://localhost:8080/api/user/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.ok) {
			alert("User deleted successfully");
			navigate("/");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/user/show/${id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const result = await response.json();
					setUser(result.data);
				}
			} catch (error) {
				alert(error.message);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div className='max-w-xl mx-auto mt-8'>
			{user && (
				<div className='relative h-80 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border shadow-lg'>
					<img
						src={user.avatar}
						alt='User Avatar'
						className='absolute top-0 right-0 w-20 h-20 rounded-full ring-4 ring-white m-4'
					/>
					<div className='p-6'>
						<h5 className='mb-2 text-xl font-semibold text-gray-900'>
							{user.first_name} {user.last_name}
						</h5>
						<p className='text-base font-light leading-relaxed text-gray-900'>
							Email: {user.email}
						</p>
						<p className='text-base font-light leading-relaxed text-gray-900'>
							Domain: {user.domain}
						</p>
						<p className='text-base font-light leading-relaxed text-gray-900'>
							Gender: {user.gender}
						</p>
						<div className='flex items-center gap-2 mt-2'>
							<div
								className={`w-3 h-3 rounded-full ${
									user.available ? "bg-green-500" : "bg-red-500"
								}`}
							></div>
							<p className='text-xs'>
								{user.available ? "Available" : "Not Available"}
							</p>
						</div>
					</div>
					<div className='absolute bottom-0 right-0 p-4'>
						<Link
							to={`/edit/${id}`}
							className='bg-blue-500 px-4 py-2 rounded-md text-white font-bold'
						>
							Edit
						</Link>
						{/* Add a button for deletion */}
						<button
							className='bg-red-500 px-4 py-2 rounded-md text-white ml-2'
							onClick={deleteHandle}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowPage;
