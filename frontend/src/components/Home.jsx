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
		color: "#114b0a",
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
		color: "#8c9aa5",
	},
];
export default function Home() {
	return (
		<>
			<div className="slide2">
				<img
					src="https://res.cloudinary.com/dhrftaik2/image/upload/v1692015821/beauty-shop/Site%20Images/banner_mq8nd7.png"
					alt=""
				/>
			</div>
			<div className="center">
				<h1>Choose a Type of service</h1>
				<p>description</p>
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
