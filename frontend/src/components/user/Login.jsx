import { useState } from "react";

//MUI Related
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
const defaultTheme = createTheme();

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginDenied, setAccess] = useState(false);

	function handleChange(e) {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	}

	function loginUser(email, password) {
		const loginMethod = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};

		fetch("api/users/login/user", loginMethod)
			.then((response) => response.json())
			.then((result) => {
				if (result.success === true) {
					console.log(result);
					localStorage.setItem(
						"beauty-shop-user",
						JSON.stringify(result.data[0])
					);
					localStorage.setItem("JWT-Token", JSON.stringify(result.token));
					window.location.replace("/");
				} else {
					setAccess(true);
				}
			})
			.catch((error) => console.log("error", error));
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
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={(e) => {
								e.preventDefault();
								loginUser(email, password);
							}}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={(e) => handleChange(e)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="current-password"
								onChange={(e) => handleChange(e)}
							/>
							{loginDenied ? (
								<p style={{ color: "red" }}>
									<b>Invalid Credentials</b>
								</p>
							) : (
								""
							)}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>

							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>

							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
