import { useState } from "react";
import { uploadFiles } from "../lib/Controller";
import { IGallery } from "../types/Gallery";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AddImage = () => {
	const { user } = useAuth();
	const [image, setImage] = useState<any>()
	const [name, setName] = useState<any>()
	const [description, setDescription] = useState<any>()
	const navigate = useNavigate()

	const handleIMage = (e: any) => {
		setImage(e.target.files[0])
	}
	const sendImage = async () => {
		try {
			const data:IGallery = {
				user: user?.uid,
				name: name,
				image: image,
				description: description
			}
			await uploadFiles(data)
			navigate('/')
		} catch (error: any) {
			console.log(error.message);
		}
	}
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Add a picture
							</h1>
							<div className="max-w-sm mx-auto">
								<div className="mb-5">
									<label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
									<input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setName(e?.target?.value)}/>
								</div>
								<div className="mb-5">
									<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
									<textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setDescription(e?.target?.value)}></textarea>
								</div>
								<div className="mb-5">
									<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
									<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file" id="file" type="file" onChange={handleIMage} />
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
								</div>
								<button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={sendImage}>New image</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddImage;