import { Fragment } from "react";
import { Link } from "react-router-dom";
import EditProfile from "./Edit";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function ViewProfile() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const [changeView, setChangeView] = useState(false);

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

	function viewEdit(x) {
		setChangeView(x);
	}
	return (
		<div
			style={{
				height: "auto",
				backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1695328725/beauty-shop/Site%20Images/paul-weaver-zVaYmVJ5y3s-unsplash_cdend8.jpg")`,
				backgroundSize: "cover",
				padding: "60px",
				heigh: "460px",
			}}
		>
			<Card
				sx={{
					display: "flex",
					backgroundColor: "transparent",
					// padding: "30px",
				}}
			>
				<CardContent sx={{ flex: 1 }} style={{ background: "white" }}>
					<>
						{changeView === false ? (
							<>
								<Typography component="h2" variant="h5">
									{user.name}
								</Typography>
								<Typography
									variant="subtitle1"
									paragraph
									color="text.secondary"
									align="center"
								>
									{user.about}
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.primary"
									style={{ paddingBottom: "10px" }}
								>
									<i>{user.email}</i>
								</Typography>
								<div className="service-btns">
									<button
										onClick={() => deleteUser()}
										style={{ background: "red" }}
									>
										DELETE ACCOUNT
									</button>
									<button onClick={() => viewEdit(true)}>EDIT PROFILE</button>
								</div>
							</>
						) : (
							<>
								<EditProfile />
								<button onClick={() => viewEdit(false)}>VIEW PROFILE</button>
							</>
						)}
					</>
				</CardContent>
				<CardMedia
					component="img"
					image={user.image}
					alt=""
					style={{ height: "60vh", width: "45vw" }}
				/>
			</Card>
		</div>
	);
}
