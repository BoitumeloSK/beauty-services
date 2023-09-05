import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function ViewProfile() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));

	function deleteUser() {
		const deleteMethod = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetch(`api/users/${user.id}`, deleteMethod)
			.then((response) => response.json())
			.then((result) => {
				localStorage.removeItem("beauty-shop-user");
				window.location.replace("/");
			});
	}

	return (
		<Fragment>
			{user ? (
				<>
					{" "}
					<img src={user.image} alt="User" />
					{user.firstName}
					<br></br>
					{user.lastName}
					<br></br>
					{user.email}
					<br></br>
					{user.about}
					<br></br>
					{user.address}
					<br></br>
					<Link to="/edit/Profile">Edit Profile</Link>
					<br></br>
					<Link to="/">Back</Link>
					<br></br>
					<button onClick={() => deleteUser()}>Delete Account</button>
				</>
			) : (
				<p>Sign Up or Login</p>
			)}
		</Fragment>
	);
}
