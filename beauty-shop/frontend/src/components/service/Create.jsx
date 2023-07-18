import { useEffect, useState } from "react";

export default function CreateService() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [urls, setUrls] = useState([]);
	const [showBtn, setShowBtn] = useState(false);

	function handleChange(e) {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		}
		if (e.target.name === "description") {
			setDescription(e.target.value);
		}
		if (e.target.name === "images") {
			const data = new FormData();
			data.append("file", e.target.files[0]);
			data.append("upload_preset", "beauty-shop");
			const imageMethod = {
				method: "POST",
				body: data,
			};

			fetch(
				"https://api.cloudinary.com/v1_1/dhrftaik2/image/upload",
				imageMethod
			)
				.then((res) => res.json())
				.then((result) => {
					setUrls([...urls, result.url]);
				});
		}
		if (e.target.name === "price") {
			setPrice(e.target.value);
		}
	}
	function handleClick(e) {
		setShowBtn(true);
	}
	function check() {
		console.log(urls);
	}
	function addService(description, price) {
		const createMethod = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				UserId: user.id,
				description,
				price,
				images: urls.join(),
			}),
		};
		fetch("api/services", createMethod)
			.then((response) => response.json())
			.then((result) => {
				if (result.success) {
					window.location.replace("/myservices");
				} else {
					console.log(result.error);
				}
			});
	}

	return (
		<>
			<div>
				{urls.map((x, i) => {
					return <img key={i} src={x} />;
				})}
			</div>
			<br></br>
			<div className="file-label">
				<input
					name="images"
					type="file"
					accept="image/*"
					className="file"
					onChange={(e) => handleChange(e)}
				/>
				<label htmlFor="images">Add Image</label>
			</div>
			<br></br>
			<label htmlFor="title">Title: </label>
			<input name="title" onChange={(e) => handleChange(e)} />
			<br></br>
			<label htmlFor="description">Description: </label>
			<textarea name="description" onChange={(e) => handleChange(e)}></textarea>
			<br></br>
			<label htmlFor="price">Price: </label>
			<input name="price" type="number" onChange={(e) => handleChange(e)} />
			<button onClick={() => check()}>Post</button>
			<br></br>
			{showBtn ? (
				<>
					<button onClick={() => addService(description, price)}>
						Post Service
					</button>
				</>
			) : (
				<>
					<button
						onClick={(e) => {
							handleClick(e);
						}}
					>
						Confirm Service
					</button>
				</>
			)}
		</>
	);
}
