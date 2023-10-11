import { Link } from "react-router-dom";

//MUI Related
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";

const displayCards = [
	{
		category: "SKIN",
		types: "FACIALS | MAKE UP | MICRO NEEDLING",
		link: "skin",
		color: "#ff5501",
	},
	{
		category: "HAIR",
		types: "BRAIDING | CUTS | MAINTENANCE | HIGHLIGHTS",
		link: "hair",
		color: "#bd783c",
	},
	{
		category: "BODY",
		types: "MASSAGES | WAXING | NAIL CARE",
		link: "body",
		color: "#ade17e",
	},
];
export default function Home() {
	return (
		<>
			<div
				style={{
					background: "#aad97f82",
					padding: "10vw",
					margin: "1.5vw 8vw",
					height: "3vh",
					width: "3vw",
					borderRadius: "50%",
					position: "absolute",
				}}
			></div>
			<div
				style={{
					background: "#ade17e",
					padding: "10vw",
					margin: "1.5vw 12vw",
					height: "3vh",
					width: "3vw",
					borderRadius: "50%",
					position: "absolute",
					zIndex: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					border: "1px solid #86cd45",
				}}
			>
				<div
					style={{
						position: "absolute",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h2 style={{ margin: "0" }}>- Hi There! -</h2>
					<p style={{ textAlign: "center", margin: "10px" }}>
						Sign up to BOOK or POST a hair, skin, or body service today.
					</p>
					<Link
						variant="button"
						to="/signup"
						sx={{ my: 1, mx: 1.5 }}
						className="clear-btn"
						style={{ width: "100px", background: "#ff5501", color: "white" }}
					>
						SIGN UP
					</Link>
				</div>
			</div>
			<div className="slide2">
				<img
					src="https://res.cloudinary.com/dhrftaik2/image/upload/v1697028762/beauty-shop/Site%20Images/am_rttflv.png"
					alt=""
				/>
			</div>
			<div className="center" style={{ margin: "50px 70px" }}>
				<h1>Welcome to Balance Me! </h1>
				<p style={{ textAlign: "center" }}>
					Your one-stop destination for all your beauty, upkeep, and wellness
					needs. We understand that taking care of your skin, hair, and body is
					not just a luxury, but an essential part of self-care and
					self-confidence. That's why we've created a seamless online platform
					that lets you effortlessly book a wide range of beauty and wellness
					services from the comfort of your home.
				</p>
			</div>
			<div className="cards">
				{displayCards.map((item, i) => {
					return (
						<Card
							sx={{ maxWidth: 345 }}
							style={{ backgroundColor: item.color }}
							key={i}
						>
							<Link to={`/services/${item.link}`}>
								<CardActionArea>
									<CardContent>
										<Typography gutterBottom variant="h3" component="div">
											{item.category}
										</Typography>
										<Typography variant="h7" color="text.secondary">
											{item.types}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Link>
						</Card>
					);
				})}
			</div>
		</>
	);
}
