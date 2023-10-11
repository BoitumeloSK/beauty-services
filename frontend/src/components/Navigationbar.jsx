import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";
// import EmailIcon from "@mui/icons-material/Email";

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
				PROFILE
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
			<Link
				onClick={() => logout()}
				sx={{ my: 1, mx: 1.5 }}
				className="link"
				variant="button"
			>
				LOGOUT
			</Link>
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
		<>
			<div
				style={{
					padding: "0 30px",
					background: "#DAB180",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", alignItems: "center" }}>
					<Email style={{ color: "#FFEDED", padding: "5px" }} />
					<p style={{ color: "#FFEDED" }}> info@balanceme.co.za</p>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "22%",
					}}
				>
					<div>
						<Link
							variant="button"
							to="/services"
							sx={{ my: 1, mx: 1.5 }}
							className="link2"
							style={{ display: "flex" }}
						>
							<CalendarMonthIcon style={{ color: "#ede9e9" }} /> BOOK NOW
						</Link>
					</div>
					<div>
						{" "}
						<Link href="https://www.facebook.com/" color="white">
							<Facebook style={{ color: "#FFEDED", padding: "5px" }} />
						</Link>
						<Link
							href="https://www.instagram.com/"
							color="white"
							sx={{ pl: 1, pr: 1 }}
						>
							<Instagram style={{ color: "#FFEDED", padding: "5px" }} />
						</Link>
						<Link href="https://www.twitter.com/" color="white">
							<Twitter style={{ color: "#FFEDED", padding: "5px" }} />
						</Link>
					</div>
				</div>
			</div>
			<AppBar
				position="sticky"
				top="0"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar
					sx={{
						flexWrap: "wrap",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<img
						src="https://res.cloudinary.com/dhrftaik2/image/upload/v1695747013/beauty-shop/Site%20Images/White_And_Black_Modern_Abstract_Beauty_Logo2_xgbifs.png"
						style={{ width: "180px" }}
						alt=""
					/>
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
		</>
	);
}
