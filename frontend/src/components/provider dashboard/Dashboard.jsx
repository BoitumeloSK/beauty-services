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
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const drawerWidth = 200;

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
		<div
			style={{
				display: "flex",
				position: "absolute",
				height: "auto",
				width: "100%",
				backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1692003783/beauty-shop/Site%20Images/josh-calabrese-XXpbdU_31Sg-unsplash-copy_ewguoh.jpg")`,
				backgroundSize: "cover",
			}}
		>
			<div>
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						[`& .MuiDrawer-paper`]: {
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}
				>
					<Box sx={{ overflow: "auto" }}>
						<List>
							{["Inbox", "Starred", "Send email", "Drafts"].map(
								(text, index) => (
									<ListItem key={text} disablePadding>
										<ListItemButton>
											<ListItemIcon>
												{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								)
							)}
						</List>
						<Divider />
						<List>
							{["All mail", "Trash", "Spam"].map((text, index) => (
								<ListItem key={text} disablePadding>
									<ListItemButton>
										<ListItemIcon>
											{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
										</ListItemIcon>
										<ListItemText primary={text} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Box>
				</Drawer>
			</div>
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
				<Box
					// sx={{ display: "flex" }}
					// style={{
					// 	backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1695329091/beauty-shop/Site%20Images/mitchel-lensink-DFIl2Kw6ulw-unsplash_sltk1s.jpg")`,
					// 	backgroundSize: "cover",
					// }}
					component="main"
					sx={{ flexGrow: 1, p: 3 }}
				>
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
			</div>
		</div>
	);
}
