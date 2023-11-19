// // FilterButton.js
// import React from "react";

// const FilterButton = ({
// 	label,
// 	options,
// 	selectedOptions,
// 	handleFilterChange,
// }) => {
// 	return (
// 		<div className='flex flex-col'>
// 			<span className='font-semibold mb-1'>{label}</span>
// 			<div className='space-y-1'>
// 				{options.map((option) => (
// 					<label
// 						key={option}
// 						className='flex items-center space-x-2'
// 					>
// 						<input
// 							type='checkbox'
// 							value={option}
// 							checked={selectedOptions.includes(option)}
// 							onChange={(e) => handleFilterChange(e.target.value)}
// 							className='rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500'
// 						/>
// 						<span>{option}</span>
// 					</label>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default FilterButton;

import React from "react";
const FilterButton = ({
	label,
	options,
	selectedOptions,
	handleFilterChange,
}) => {
	return (
		<div>
			<label className='block mb-1 font-semibold'>{label}</label>
			<div className='space-y-2'>
				{options.map((option, index) => (
					<div
						key={index}
						className='flex items-center'
					>
						<input
							type='checkbox'
							id={`${label}-${index}`}
							value={option}
							checked={selectedOptions.includes(option)}
							onChange={(e) => handleFilterChange(e.target.value)}
							className='mr-2'
						/>
						<label htmlFor={`${label}-${index}`}>{option.toString()}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterButton;
