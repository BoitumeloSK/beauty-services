import { Link } from "react-router-dom";

//MUI Related
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NoAccess() {
	return (
		<>
			<Link
				variant="button"
				to="/signup"
				sx={{ my: 1, mx: 1.5 }}
				className="link"
			>
				SIGN UP
			</Link>
			<Link
				variant="button"
				to="login"
				sx={{ my: 1, mx: 1.5 }}
				className="link"
			>
				LOGIN
			</Link>
		</>
	);
}
function logout() {
	const logoutMethod = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch("api/users/logout", logoutMethod)
		.then((response) => response.json())
		.then((result) => {
			localStorage.removeItem("beauty-shop-user");
			window.location.replace("/");
		})
		.catch((error) => console.log("error", error));
}

function GrantedAccess() {
	const storageKey = JSON.parse(localStorage.getItem("beauty-shop-user"));
	return (
		<>
			<Link
				variant="button"
				to="/profile"
				sx={{ my: 1, mx: 1.5 }}
				className="link"
			>
				VIEW PROFILE
			</Link>
			{storageKey.role === "provider" ? (
				<>
					<Link
						variant="button"
						to="/postService"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						POST SERVICE
					</Link>
					<Link
						variant="button"
						to="/myservices"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						MY SERVICES
					</Link>
					<Link
						variant="button"
						to="/providerbookings"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						BOOKINGS
					</Link>
				</>
			) : storageKey.role === "admin" ? (
				<>
					<Link
						variant="button"
						to="/applications"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						APPLICATIONS
					</Link>
					<Link
						variant="button"
						to="/allbookings"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						ALL BOOKINGS
					</Link>
				</>
			) : storageKey.role === "customer" ? (
				<Link
					variant="button"
					to="/mybookings"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					MY BOOKINGS
				</Link>
			) : (
				""
			)}
			<button
				onClick={() => logout()}
				sx={{ my: 1, mx: 1.5 }}
				className="link2"
				variant="button"
			>
				LOGOUT
			</button>
		</>
	);
}

export default function Home() {
	const storageKey = localStorage.getItem("beauty-shop-user");
	return (
		<>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: "wrap" }}>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						ICONIC FLAIR
					</Typography>
					<nav>{storageKey === null ? <NoAccess /> : <GrantedAccess />}</nav>
				</Toolbar>
			</AppBar>
			<div className="slide2">
				<img
					src="https://res.cloudinary.com/dhrftaik2/image/upload/v1691427724/beauty-shop/Site%20Images/content-pixie-TxBQ7yLj6JU-unsplash-lotiononhand_xmslls.jpg"
					alt=""
				/>
			</div>
		</>
	);
}
