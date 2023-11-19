import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";

const EditUser = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		gender: "",
		avatar: "",
		domain: "",
		available: false,
	});

	const [loading, setLoading] = useState(false);

	const TransformFile = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setForm({ ...form, avatar: reader.result });
			};
		} else {
			setForm({ ...form, avatar: "" });
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		TransformFile(file);
	};
	const handleChangeCheck = (e) => {
		const { name, checked } = e.target;
		setForm({ ...form, [name]: checked });
	};
	const handleChangeGender = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);

		if (form.first_name && form.avatar) {
			setLoading(true);
			try {
				const response = await fetch(
					`http://localhost:8080/api/user/edit/${id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ ...form }),
					}
				);

				await response.json();
				alert("Success");
				navigate(`/show/${id}`);
			} catch (err) {
				alert(err);
			} finally {
				setLoading(false);
			}
		} else {
			alert("Please generate an image with proper details");
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/user/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const result = await response.json();
					setUser(result.data);
					// Update the form state with user details
					setForm({
						first_name: result.data.first_name || "",
						last_name: result.data.last_name || "",
						email: result.data.email || "",
						gender: result.data.gender || "",
						avatar: result.data.avatar || "",
						domain: result.data.domain || "",
						available: result.data.available || false,
					});
				}
			} catch (error) {
				alert(error.message);
			}
		};

		fetchData();
	}, [id]);

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>Edit</h1>
				<p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
					Edit you User Here...
				</p>
			</div>

			<form
				className='mt-16 max-w-3xl'
				onSubmit={handleSubmit}
			>
				<div className='flex flex-col gap-5'>
					<div className='flex flex-row gap-5 '>
						<FormField
							labelName='First Name'
							type='text'
							name='first_name'
							placeholder='Ex., john doe'
							value={form.first_name}
							handleChange={handleChange}
						/>
						<FormField
							labelName='Last Name'
							type='text'
							name='last_name'
							placeholder='Ex., john doe'
							value={form.last_name}
							handleChange={handleChange}
						/>
					</div>
					<FormField
						labelName='Email'
						type='email'
						name='email'
						placeholder='Ex., abc@gmail.com'
						value={form.email}
						handleChange={handleChange}
					/>
					<div>
						<label
							htmlFor='gender'
							className='block mb-2 text-sm font-medium text-gray-900'
						>
							Select your gender:
						</label>
						<select
							id='gender'
							name='gender'
							value={form.gender}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3'
							onChange={handleChangeGender}
						>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
							<option value='other'>Other</option>
						</select>
					</div>
					<FormField
						labelName='Domain'
						type='text'
						name='domain'
						placeholder='Ex., Sale,IT'
						value={form.domain}
						handleChange={handleChange}
					/>
				</div>
				<div>
					<label>
						<span className='block mb-2 text-sm font-medium text-gray-900'>
							Image
						</span>
						<input
							type='file'
							accept='image/*'
							// value={post.photo}
							onChange={handleImageChange}
							placeholder='Upload your image here'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3'
						/>
					</label>
					<label className='block mb-5 text-sm font-medium text-gray-900 mt-2 px-2'>
						Available:
						<input
							type='checkbox'
							name='available'
							checked={form.available}
							onChange={handleChangeCheck}
						/>
					</label>
				</div>

				<div className='mt-10 flex justify-between'>
					<Link
						to='/'
						className='text-white bg-red-700 font-medium rounded-md text-sm px-5 py-2.5'
					>
						Cancel
					</Link>
					<button
						type='submit'
						className='text-white bg-[#6469ff] font-medium rounded-md text-sm px-5 py-2.5'
					>
						{loading ? "updating..." : "Update"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default EditUser;
