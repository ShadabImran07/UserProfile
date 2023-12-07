import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {
	CreatePost,
	Home,
	EditUser,
	ShowPage,
	TeamCreatePage,
	Teams,
	TeamShowPage,
} from "./pages";

const App = () => {
	return (
		<BrowserRouter>
			<header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
				<Link
					to='/'
					className='font-bold'
				>
					Heliverse
				</Link>
				<div className='flex gap-5'>
					<Link
						to='/create-post'
						className='font-inter font-medium bg-[#006600] text-white px-4 py-2 rounded-md'
					>
						Create User
					</Link>
					<Link
						to='/create-team'
						className='font-inter font-medium bg-[#006600] text-white px-4 py-2 rounded-md'
					>
						Create Team
					</Link>
					<Link
						to='/teams'
						className='font-inter font-medium bg-[#006600] text-white px-4 py-2 rounded-md h-[20%]'
					>
						Show Teams
					</Link>
				</div>
			</header>
			<main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/create-post'
						element={<CreatePost />}
					/>
					<Route
						path='/edit/:id'
						element={<EditUser />}
					/>
					<Route
						path='/show/:id'
						element={<ShowPage />}
					/>
					<Route
						path='/create-team'
						element={<TeamCreatePage />}
					/>
					<Route
						path='/teams'
						element={<Teams />}
					/>
					<Route
						path='/team-details/:id'
						element={<TeamShowPage />}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
