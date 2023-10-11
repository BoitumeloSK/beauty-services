import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

export default function ChangePassword() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const defaultTheme = createTheme();

	function handleChange(e) {
		if (e.target.name === "password") {
			setPassword(e.target.value);
		}
		if (e.target.name === "confirm") {
			setConfirmPassword(e.target.value);
		}
	}

	function passwordChange(password, confirmPassword) {
		const passwordMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: password,
				confirmPassword: confirmPassword,
			}),
		};
		fetch(`api/users/password/${user.id}`, passwordMethod)
			.then((response) => response.json())
			.then((result) => {
				if (result.success === true) {
					const getMethod = {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					};
					fetch(`api/users/${user.id}`, getMethod)
						.then((response) => response.json())
						.then((result) => {
							localStorage.setItem(
								"beauty-shop-user",
								JSON.stringify(result.data[0])
							);
							window.location.replace("/");
						});
				} else {
					console.log(result.error);
				}
			});
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Grid container component="main" sx={{ height: "100vh" }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1697021874/beauty-shop/Site%20Images/joshua-fuller-Q1Vb0xIn0Ag-_xvmzuw.jpg")`,
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<LockResetIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Change Password
						</Typography>
						<Box noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								label="New Password"
								name="password"
								autoComplete="password"
								type="password"
								onChange={(e) => handleChange(e)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="confirm"
								label="Confirm Password"
								type="password"
								autoComplete="confirm-password"
								onChange={(e) => handleChange(e)}
							/>
							{password !== confirmPassword ? (
								<p style={{ color: "red" }}>
									<b>Passwords do not match</b>
								</p>
							) : (
								""
							)}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={() => passwordChange(password, confirmPassword)}
							>
								Submit
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
