import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Total from "./Total";
import BookingsList from "./BookingsList";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import CreateService from "../service/create service/CreateService";
import ProviderServices from "../service/ProviderServices";

const drawerWidth = 200;

export default function Dashboard() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [target, setTarget] = useState("analytics");

	useEffect(() => {
		const getBookings = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch("/api/bookings/provider/list", getMethod)
					.then((response) => response.json())
					.then((result) => {
						setLoading(false);
						setBookings(result.data);
					});
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};
		getBookings();
	}, []);

	if (isLoading) {
		return <>Loading...</>;
	}
	if (!bookings) {
		return <>No data found</>;
	}
	// function targetComponent(name) {
	// 	setTarget(name);
	// }
	function Analytics() {
		return (
			<>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<CssBaseline />

					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							{/* Chart */}
							<Grid item xs={12} md={8} lg={9}>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										height: 300,
									}}
								>
									<Chart bookings={bookings} />
								</Paper>
							</Grid>
							{/* Recent Deposits */}
							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										height: 300,
									}}
								>
									<Total bookings={bookings} />
								</Paper>
							</Grid>
							{/* Recent Orders */}
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
									<BookingsList bookings={bookings} />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</>
		);
	}

	return (
		<div
			style={
				{
					// display: "flex",
					// position: "absolute",
					// height: "auto",
					// width: "100%",
					// backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1692003783/beauty-shop/Site%20Images/josh-calabrese-XXpbdU_31Sg-unsplash-copy_ewguoh.jpg")`,
					// backgroundSize: "cover",
				}
			}
		>
			<div>
				<Typography component="h1" variant="h3" align="center" margin={3}>
					Service Dashboard
				</Typography>
				<p
					style={{
						padding: "0 20px",
						textAlign: "center",
						background: "white",
					}}
				>
					Hi [User], welcome to your service dashboard where you will find all
					your service reports, as well as service creation and management
					tools. Explore your Iconic Flair!
				</p>
				<Analytics />
			</div>
		</div>
	);
}
