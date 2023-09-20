import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Chart from "./Chart";
import Total from "./Total";
import BookingsList from "./BookingsList";
import { useState, useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setLoading] = useState(true);
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
	function completeService(bookingId) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				fulfilled: true,
			}),
		};
		fetch(`/api/bookings/complete/${bookingId}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				console.log(bookingId);
				console.log(result);
			})
			.catch((error) => console.log(error));
	}
	if (isLoading) {
		return <>Loading...</>;
	}
	if (!bookings) {
		return <>No data found</>;
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Box sx={{ display: "flex" }}>
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
									height: 240,
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
									height: 240,
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
		</ThemeProvider>
	);
}
