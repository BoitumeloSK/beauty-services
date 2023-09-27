import { useState } from "react";
import { TextField } from "@mui/material";

function AddAbout({ name, changeFunction, about }) {
	return (
		<>
			<TextField
				id="outlined-multiline-static"
				name={name}
				label="About"
				multiline
				rows={5}
				defaultValue={about}
				onChange={changeFunction}
				style={{ marginBottom: "20px" }}
			/>
			<br></br>
		</>
	);
}

export default function EditProfile({ viewEditFunction }) {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));

	const [name, setName] = useState(user.name);
	const [about, setAbout] = useState(user.about);
	const [address, setAddress] = useState(user.address);

	function handleChange(e) {
		if (e.target.name === "name") {
			setName(e.target.value);
		}
		if (e.target.name === "about") {
			setAbout(e.target.value);
			console.log(e);
		}
		if (e.target.name === "address") {
			setAddress(e.target.value);
		}
	}

	function confirmEdit(name, about, address) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				about: about,
				address: address,
			}),
		};

		fetch(`/api/users/${user.id}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/users/${user.id}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						localStorage.setItem(
							"beauty-shop-user",
							JSON.stringify(result.data[0])
						);
						window.location.replace("/profile");
					})
					.catch((error) => console.log("error", error));
			})
			.catch((error) => console.log("error", error));
	}

	return (
		<div>
			<TextField
				style={{ width: "400px", marginBottom: "20px" }}
				name="name"
				label="Name"
				autoComplete="name"
				defaultValue={name}
				onChange={(e) => handleChange(e)}
			/>
			{user.role === "provider" ? (
				<AddAbout name="about" changeFunction={handleChange} about={about} />
			) : (
				""
			)}
			<TextField
				style={{ width: "400px", marginBottom: "20px" }}
				name="address"
				autoComplete="address"
				defaultValue={address}
				label="Address"
				onChange={(e) => handleChange(e)}
			/>
			<div
				className="service-btns"
				style={{ display: "flex", justifyContent: "center" }}
			>
				<button
					onClick={() => confirmEdit(name, about, address)}
					style={{ width: "unset" }}
				>
					CONFIRM EDIT
				</button>
				<button onClick={viewEditFunction} style={{ width: "unset" }}>
					VIEW PROFILE
				</button>
			</div>
		</div>
	);
}
