import React, { useEffect, useState } from "react";

import { Card, FormField, Loader, FilterButton } from "../components";
import { Link } from "react-router-dom";

const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post) => (
			<div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
				<Card
					key={post._id}
					{...post}
				/>
			</div>
		));
	}
	return (
		<h2 className='mt-5 font-bold text-[#006600] text-xl uppercase'>{title}</h2>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);

	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [selectedFilters, setSelectedFilters] = useState({
		gender: [],
		availability: [],
	});
	const [filteredData, setFilterdData] = useState(null);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const fetchPosts = async () => {
		setLoading(true);

		try {
			const response = await fetch(
				`https://userprofile-backend.onrender.com/api/user/${currentPage}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				const totalPosts = result.data.length;
				setTotalPages(Math.ceil(70 / totalPosts));
				setAllPosts(result.data.reverse());
			}
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};
	const applyFilters = async (searchTextValue, filters) => {
		const searchData = {
			searchText: searchTextValue,
			selectedFilters: filters,
		};
		try {
			const response = await fetch(
				"https://userprofile-backend.onrender.com/api/user/search",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(searchData),
				}
			);
			if (response.ok) {
				const results = await response.json();
				setFilterdData(results.results);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [currentPage]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
		applyFilters(e.target.value, selectedFilters);
	};
	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: prevFilters[filterType].includes(value)
				? prevFilters[filterType].filter((filter) => filter !== value)
				: [...prevFilters[filterType], value],
		}));
		applyFilters(searchText, {
			...selectedFilters,
			[filterType]: selectedFilters[filterType].includes(value)
				? selectedFilters[filterType].filter((filter) => filter !== value)
				: [...selectedFilters[filterType], value],
		});
	};
	console.log(filteredData);
	const renderFilteredCards = () => {
		if (filteredData) {
			return filteredData.length > 0 ? (
				<RenderCards
					data={filteredData}
					title='Filtered Posts'
				/>
			) : (
				<h2 className='mt-5 font-bold text-[#006600] text-xl uppercase'>
					No Filtered Posts Found
				</h2>
			);
		} else {
			return (
				<h2 className='mt-5 font-bold text-[#006600] text-xl uppercase'>
					Loading...
				</h2>
			);
		}
	};

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>
					All Users Showcase
				</h1>
				<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
					Browse through a collection of user and see through thier profile
				</p>
			</div>

			<div className='flex justify-between space-x-4 mb-4'>
				<div className='flex'>
					<FormField
						labelName='Search posts'
						type='text'
						name='text'
						placeholder='Search something...'
						value={searchText}
						handleChange={handleSearchChange}
					/>
				</div>
				<div className='flex space-x-4'>
					<div>
						<FilterButton
							label='Gender'
							options={["Male", "Female", "Other"]}
							selectedOptions={selectedFilters.gender}
							handleFilterChange={(value) =>
								handleFilterChange("gender", value)
							}
						/>
					</div>
					<div>
						<FilterButton
							label='Availability'
							options={["true", "false"]} // Assuming availability options are true or false
							selectedOptions={selectedFilters.availability}
							handleFilterChange={(value) =>
								handleFilterChange("availability", value)
							}
						/>
					</div>
				</div>
			</div>

			<div className='flex space-x-4 mb-4'>
				{/* Gender Filter */}

				{/* Availability Filter */}
			</div>

			<div className='mt-10'>
				{loading ? (
					<div className='flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className='font-medium text-[#666e75] text-xl mb-3'>
								Showing Results for{" "}
								<span className='text-[#222328]'>{searchText}</span>:
							</h2>
						)}
						<div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
							{/* Render filtered cards */}
							{filteredData && filteredData.length > 0 ? (
								renderFilteredCards()
							) : (
								// <p>hello</p>
								<RenderCards
									data={allPosts}
									title='ALl Profile'
								/>
								// <p>hello</p>
							)}
						</div>
					</>
				)}
			</div>
			<div className='flex justify-center items-center py-4 '>
				<button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className={`px-4 py-2 mr-2 bg-green-600 text-white rounded ${
						currentPage === 1
							? "opacity-50 cursor-not-allowed"
							: "cursor-pointer"
					}`}
				>
					Previous
				</button>
				<span className='text-lg font-semibold'>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={handleNextPage}
					disabled={allPosts?.length === 0 || currentPage === totalPages}
					className={`px-4 py-2 ml-2 bg-green-600 text-white rounded ${
						allPosts?.length === 0 || currentPage === totalPages
							? "opacity-50 cursor-not-allowed"
							: "cursor-pointer"
					}`}
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default Home;
