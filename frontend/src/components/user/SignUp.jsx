import { Fragment, useState } from "react";
//MUI Related
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function SignUp() {
	const [fName, setFName] = useState();
	const [lName, setLName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [about, setAbout] = useState("I am a customer");
	const [image, setImage] = useState();
	const [address, setAddress] = useState();
	const [userOption, setUserOption] = useState();

	//MUI Related
	function Copyright(props) {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				{...props}
			>
				{"Copyright © "}
				<Link color="inherit" href="http://localhost:3000">
					Beauty-Shop
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		);
	}
	const defaultTheme = createTheme();
	//

	function handleChange(e) {
		if (e.target.name === "fName") {
			setFName(e.target.value);
		}
		if (e.target.name === "lName") {
			setLName(e.target.value);
		}
		if (e.target.name === "email") {
			setEmail(e.target.value);
		}
		if (e.target.name === "password") {
			setPassword(e.target.value);
		}
		if (e.target.name === "confirm") {
			setConfirmPassword(e.target.value);
		}
		if (e.target.name === "about") {
			setAbout(e.target.value);
		}
		if (e.target.name === "address") {
			setAddress(e.target.value);
		}
		if (e.target.name === "user") {
			setUserOption(e.target.value);
		}
		if (e.target.name === "image") {
			setImage(e.target.files[0]);
		}
	}

	function createUser(
		fName,
		lName,
		email,
		password,
		confirmPassword,
		about,
		address
	) {
		console.log("hey");
		const data = new FormData();
		data.append("file", image);
		data.append("upload_preset", "beauty-shop");
		const imageMethod = {
			method: "POST",
			body: data,
		};
		fetch("https://api.cloudinary.com/v1_1/dhrftaik2/image/upload", imageMethod)
			.then((res) => res.json())
			.then((result) => {
				const createMethod = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName: fName,
						lastName: lName,
						email: email,
						password: password,
						confirmPassword: confirmPassword,
						about: about,
						address: address,
						image: result.url,
					}),
				};
				fetch("api/users", createMethod)
					.then((response) => response.json())
					.then((result) => {
						if (result.success === true) {
							window.location.replace("/");
						} else {
							console.log(result);
						}
					})
					.catch((error) => console.log("error", error));
			});
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>

					<Grid container spacing={2}>
						<Grid item xs={12}>
							<InputLabel id="demo-simple-select-label">
								Sign up as...
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Sign up as:"
								fullWidth
								name="user"
								autoFocus
								defaultValue="customer"
								onChange={(e) => handleChange(e)}
							>
								<MenuItem value="customer">Customer</MenuItem>
								<MenuItem value="provider">Service Provider</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="fName"
								required
								fullWidth
								label="First Name"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								label="Last Name"
								name="lName"
								autoComplete="family-name"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								autoComplete="new-password"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirm"
								label="Confirm"
								type="password"
								autoComplete="confirm-password"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="address"
								label="Address"
								autoComplete="address"
								onChange={(e) => handleChange(e)}
							/>
						</Grid>
						{userOption === "provider" ? (
							<>
								<Grid item xs={15}>
									<TextField
										id="outlined-multiline-static"
										label="About"
										name="about"
										multiline
										rows={4}
										onChange={(e) => handleChange(e)}
									/>
								</Grid>
							</>
						) : (
							about == "I am a customer"
						)}
						<Grid item xs={12}>
							<label htmlFor="image">Profile Image</label>
							<input
								type="file"
								accept="image/*"
								id="profile-image"
								name="image"
								required
								onChange={(e) => handleChange(e)}
							/>

							{/* <Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>  */}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={() =>
							createUser(
								fName,
								lName,
								email,
								password,
								confirmPassword,
								about,
								address
							)
						}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
