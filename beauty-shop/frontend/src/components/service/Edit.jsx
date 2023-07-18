import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function EditService() {
	const [service, setService] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [visibility, setVisibility] = useState();
	useEffect(() => {
		const getService = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/services/${id}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						setService(result.data[0]);
						setIsLoading(false);
					});
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		};
		getService();
	}, [id]);
	function handleChange(e) {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		}
		if (e.target.name === "description") {
			setDescription(e.target.value);
		}
		if (e.target.name === "price") {
			setPrice(e.target.value);
		}
		if (e.target.name === "visibility") {
			setVisibility(e.target.checked);
			console.log(e.target.checked);
		}
	}
	function editService(title, description, price, visibility) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				price,
				visibility,
			}),
		};
		fetch(`/api/services/${service.id}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				window.location.replace(`/viewservice/${service.id}`);
			});
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!service) {
		return <div>No data found.</div>;
	}
	return (
		<>
			<label htmlFor="title">Title: </label>
			<input
				name="title"
				value={service.title}
				onChange={(e) => handleChange(e)}
			/>
			<br></br>
			<label htmlFor="description">Description: </label>
			<textarea
				name="description"
				value={service.description}
				onChange={(e) => handleChange(e)}
			></textarea>
			<br></br>
			<label htmlFor="price">Price: </label>
			<input
				type="number"
				name="price"
				value={service.price}
				onChange={(e) => handleChange(e)}
			/>
			<br></br>
			<label htmlFor="visibility">Visibility: </label>
			<input
				type="checkbox"
				name="visibility"
				checked={service.visible}
				onChange={(e) => handleChange(e)}
			/>
			<br></br>
			<button
				onClick={() => editService(title, description, price, visibility)}
			>
				Update Service
			</button>
		</>
	);
}
