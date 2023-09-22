import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { linkClasses } from "@mui/material";
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
				to="/login"
				sx={{ my: 1, mx: 1.5 }}
				className="link"
			>
				LOGIN
			</Link>
		</>
	);
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
						to="/dashboard"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						DASHBOARD
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
function logout() {
	const removeCookie = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};
	fetch("/api/users/logout", removeCookie)
		.then((response) => response.json())
		.then((result) => {
			localStorage.removeItem("beauty-shop-user");
			document.location.replace("/");
		});
}

export default function Navigationbar() {
	const storageKey = localStorage.getItem("beauty-shop-user");
	return (
		<AppBar
			position="fixed"
			color="default"
			elevation={0}
			sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
		>
			<Toolbar sx={{ flexWrap: "wrap" }}>
				<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					ICONIC FLAIR
				</Typography>
				<nav>
					<Link
						variant="button"
						to="/"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						HOME
					</Link>
					<Link
						variant="button"
						to="/services"
						sx={{ my: 1, mx: 1.5 }}
						className="link"
					>
						SERVICES
					</Link>
					{storageKey === null ? <NoAccess /> : <GrantedAccess />}
				</nav>
			</Toolbar>
		</AppBar>
	);
}
