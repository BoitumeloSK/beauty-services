import { Link } from "react-router-dom";
export default function UserProfile() {
	const user = JSON.parse(sessionStorage.getItem("single-user"));

	function setRole() {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				role: "provider",
			}),
		};
		fetch(`api/users/role/${user.id}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				window.location.replace("/applications");
			});
	}
	console.log("hey");
	return (
		<>
			<p>
				<b>First Name: </b>
				{user.firstName}
			</p>
			<p>
				<b>Last Name: </b>
				{user.lastName}
			</p>
			<p>
				<b>Email: </b>
				{user.email}
			</p>
			<p>
				<b>Address: </b>
				{user.address}
			</p>
			<p>
				<b>About: </b>
				{user.about}
			</p>
			<button onClick={() => setRole()}>Approve Application</button>
			<button>Decline Application</button>
			<Link to="/applications">Back</Link>
		</>
	);
}
