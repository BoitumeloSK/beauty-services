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
				href="/signup"
				sx={{ my: 1, mx: 1.5 }}
				className="link"
			>
				SIGN UP
			</Link>
			<Link
				variant="button"
				href="/login"
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
			{storageKey.role === "admin" ? (
				<Link
					variant="button"
					href="/applications"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					APPLICATIONS
				</Link>
			) : (
				""
			)}
			{storageKey.role === "provider" ? (
				<>
					<Link
						variant="button"
						href="/postService"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						POST SERVICE
					</Link>
					<Link
						variant="button"
						href="/myservices"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						MY SERVICES
					</Link>
					<Link
						variant="button"
						href="/providerbookings"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						BOOKINGS
					</Link>
				</>
			) : (
				<Link
					variant="button"
					href="/mybookings"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					MY BOOKINGS
				</Link>
			)}
			<>
				<Link
					variant="button"
					href="/services"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					SERVICES
				</Link>
				<Link
					variant="button"
					href="/profile"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					VIEW PROFILE
				</Link>
				<Link
					variant="button"
					href="/providerbookings"
					sx={{ my: 1, mx: 1.5 }}
					className="link"
				>
					BOOKINGS
				</Link>
			</>
			<button onClick={() => logout()}>LOGOUT</button>
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
		</>
	);
}
