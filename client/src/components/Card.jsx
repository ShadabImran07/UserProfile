import React from "react";
import { Link } from "react-router-dom";

const Card = ({
	_id,
	first_name,
	last_name,
	email,
	gender,
	avatar,
	domain,
	available,
}) => {
	return (
		<div className='rounded-xl relative shadow-card card'>
			<div className='w-full h-48 rounded-t-xl overflow-hidden relative'>
				{/* <img
					className='w-full h-full object-cover'
					src={avatar}
					alt={`${first_name} ${last_name}`}
				/> */}
			</div>
			<div className='flex flex-col max-h-[94.5%] absolute bottom-0 left-0 right-0 bg-[#fafafb] m-2 p-4 rounded-m'>
				<div className='absolute top-1 right-1'>
					<div
						className={`w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300`}
					>
						<img
							className='w-full h-full object-cover'
							src={avatar}
							alt={`${first_name} ${last_name}`}
						/>
					</div>
				</div>
				<p className='text-black text-sm overflow-y-auto'>{`${first_name} ${last_name}`}</p>
				<p className='text-black text-xs mb-1'>{email}</p>

				<div className='flex items-center gap-2 mb-1'>
					<div
						className={`w-3 h-3 rounded-full ${
							available ? "bg-green-500" : "bg-red-500"
						}`}
					></div>
					<p className='text-black text-xs'>
						{available ? "Available" : "Not Available"}
					</p>
				</div>

				<p className='text-black text-xs mb-1'>{gender}</p>
				<p className='text-black text-xs mb-2'>{domain}</p>

				<div className='absolute inset-1 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100'>
					<Link
						to={`/show/${_id}`}
						className='bg-green-600 text-black px-2 py-1 rounded-md text-xs'
					>
						Show Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Card;
