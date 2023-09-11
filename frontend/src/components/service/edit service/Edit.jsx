import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AvailabilityCalendar from "../../Calendar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import * as React from "react";
export default function EditService() {
	const [service, setService] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [slots, setSlots] = useState([]);
	const [dateTime, setDateTime] = useState("");
	const [newDateTime, setNewDateTime] = useState("");
	const [visibility, setVisibility] = useState();
	const [change, setChange] = useState();
	const [slotId, setSlotId] = useState();
	const [duplicateMsg, setDuplicateMsg] = useState(false);
	const [editView, setEditView] = useState(false);
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const [calendarSlots, setCalendarSlots] = useState([]);
	const [actionComplete, setAction] = useState();

	function continueBtn() {
		setAction(true);
	}
	function ContinueEditing() {
		return (
			<div className="center" style={{ padding: "50px" }}>
				<img
					style={{ width: "200px" }}
					alt="tick"
					src="https://res.cloudinary.com/dhrftaik2/image/upload/v1694437054/beauty-shop/Site%20Images/tick_iiqlap.png"
				/>
				<h2>Action Complete!</h2>
				<p>
					<button className="a-btn" onClick={() => continueBtn()}>
						Continue editing
					</button>{" "}
					or <Link to={`/viewservice/${service.id}`}>view service.</Link>
				</p>
			</div>
		);
	}
	useEffect(() => {
		//Get the service by ID based on params and fetch its slots
		//isLoading sets the page view to "Loading..."whilst the service is still being fetched
		const getService = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/services/${id}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						setService(result.data[0]);
						setIsLoading(false);
						fetch(`/api/slots/${id}`, getMethod)
							.then((response) => response.json())
							.then((result) => {
								setSlots(result.data);
								let slotsArray = [];
								if (result.data.length > 0) {
									// Loop through the slotsArray and update each slot's startTime
									for (let i = 0; i < result.data.length; i++) {
										slotsArray.push(result.data[i].startTime.slice(0, 10));
									}
									setCalendarSlots(slotsArray);
								}
							});
					});
			} catch (error) {
				console.log(error);
			}
		};
		getService();
	}, [id]);

	//Handles the input changes of each of the service attributes
	function handleChange(e) {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		}
		if (e.target.name === "description") {
			setDescription(e.target.value);
		}
		if (e.target.name === "price") {
			setPrice(e.target.value);
		}
		if (e.target.name === "visibility") {
			setVisibility(e.target.checked);
		}

		//Initially the dateTime input has no value
		//When a slot is clicked, dateTime is set to it's value
		//change (time it should be changed to), is set to the value of the input
		if (e.target.name === "dateTime") {
			if (dateTime) {
				setChange(e.target.value);
			} else if (dateTime === "") {
				e.target.value = "";
			}
		}

		//Value of a new slot that should be added
		if (e.target.name === "newDateTime") {
			console.log(e.target.value);
			setNewDateTime({ id: "", startTime: e.target.value });
		}
	}

	//When a slot is clicked, the value of the input is set to it's date
	//dateTime is then set to the startTime of that slot
	//slotId is set to the id of the slot
	function changeDateTime(e, id, startTime) {
		if (e.target.name == id) {
			setDateTime(startTime);
			setSlotId(id);
		}
	}

	//Add slot (REFACTOR FROM CREATE SERVICE)
	function addSlot() {
		let found = slots.filter((x) => x === newDateTime);
		if (found.length > 0) {
			setDuplicateMsg(true);
		} else {
			setDuplicateMsg(false);
			const createMethod = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ServiceId: id,
					startTime: newDateTime.startTime.split("T").join(" "),
				}),
			};
			fetch("/api/slots", createMethod)
				.then((response) => response.json())
				.then((result) => {
					setAction(false);
				});
		}
	}

	//Edit's a slot in the database based on the value of change (dateTime input value)
	function changeSlot(slotId) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				startTime: change.split("T").join(" "),
			}),
		};
		fetch(`/api/slots/${slotId}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAction(false);
			});
		setDateTime("");
	}

	//Delete a slot
	function deleteSlot(id) {
		const deleteMethod = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/slots/${id}`, deleteMethod)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setAction(false);
			});
	}
	//Edit a service
	function editService(title, description, price, visibility) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				price,
				visible: visibility,
			}),
		};
		fetch(`/api/services/${service.id}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				setAction(false);
			});
	}

	function changeEditView(changeValue) {
		if (changeValue == false) {
			setEditView(true);
		} else {
			setEditView(false);
		}
	}

	//Page viewing based getService promise
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!service) {
		return <div>No data found.</div>;
	}

	return (
		<>
			<div
				style={{
					position: "absolute",
					height: "auto",
					width: "100%",
					backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1692003783/beauty-shop/Site%20Images/josh-calabrese-XXpbdU_31Sg-unsplash-copy_ewguoh.jpg")`,
					backgroundSize: "cover",
				}}
			>
				<React.Fragment>
					<CssBaseline />
					<Container component="main" maxWidth="md" sx={{ mb: 4 }}>
						<Paper
							variant="outlined"
							sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
						>
							<Typography component="h1" variant="h4" align="center">
								Edit Service
							</Typography>
							{actionComplete === false ? (
								<ContinueEditing />
							) : (
								<>
									<div
										className="flex-and-center"
										style={{ justifyContent: "space-between" }}
									>
										<div className="flex-and-center">
											{editView === false ? <span className="dot"></span> : ""}
											<button
												className="no-style-btn"
												onClick={() => changeEditView(true)}
											>
												Change Service Details
											</button>
										</div>
										<span
											style={{
												display: "inline-block",
												width: "50%",
												borderTop: "0.2px solid #80808082",
											}}
										></span>
										<div className="flex-and-center">
											{editView === true ? <span className="dot"></span> : ""}
											<button
												className="no-style-btn"
												onClick={() => changeEditView(false)}
											>
												Change Slots
											</button>
										</div>
									</div>

									<br></br>

									<React.Fragment>
										{editView === true ? (
											<div className="center">
												<p>
													<i>
														To edit a time slot, click on the date in the
														calendar and time.
													</i>
												</p>
												<AvailabilityCalendar
													availableDates={calendarSlots}
													user={user}
													serviceId={id}
													preferredFunction={deleteSlot}
													btnTxt={"X"}
													getSlots={true}
													updateFunction={changeDateTime}
												/>
												<div
													className="flex-and-center"
													style={{
														width: "100%",
														justifyContent: "space-between",
													}}
												>
													<div style={{ display: "flex" }}>
														<input
															type="datetime-local"
															name="dateTime"
															onChange={(e) => handleChange(e)}
															defaultValue={dateTime.slice(0, 16)}
														/>
														<button
															onClick={() => changeSlot(slotId)}
															className="btn"
															style={{ background: "#9b6a4e" }}
														>
															CHANGE SLOT
														</button>
													</div>
													<br></br>
													{duplicateMsg ? <>Slot already added</> : ""}
													<div style={{ display: "flex" }}>
														<input
															type="datetime-local"
															name="newDateTime"
															onChange={(e) => handleChange(e)}
														/>
														<button onClick={() => addSlot()} className="btn">
															ADD SLOT
														</button>
													</div>
												</div>
											</div>
										) : (
											<>
												<Grid container spacing={3}>
													<Grid item xs={12}>
														<InputLabel htmlFor="title">Title</InputLabel>
														<TextField
															style={{ width: "400px" }}
															name="title"
															autoComplete="title"
															defaultValue={service.title}
															onChange={(e) => handleChange(e)}
														/>
													</Grid>
													<Grid item xs={12}>
														<InputLabel htmlFor="description">
															Description
														</InputLabel>
														<TextField
															id="outlined-multiline-static"
															name="description"
															multiline
															rows={4}
															defaultValue={service.description}
															onChange={(e) => handleChange(e)}
														/>
													</Grid>
													<Grid item xs={4}>
														<InputLabel htmlFor="outlined-adornment-amount">
															Amount
														</InputLabel>
														<OutlinedInput
															id="outlined-adornment-amount"
															startAdornment={
																<InputAdornment position="start">
																	R
																</InputAdornment>
															}
															label="Amount"
															name="price"
															defaultValue={service.price}
															onChange={(e) => handleChange(e)}
														/>
													</Grid>
													<Grid item xs={12}>
														<FormControlLabel
															control={
																<Checkbox
																	color="secondary"
																	name="visibility"
																	value={service.visible}
																	defaultChecked={service.visible}
																/>
															}
															label="Show service to all after adding it?"
															onChange={(e) => handleChange(e)}
														/>
													</Grid>
												</Grid>
												<Box
													sx={{ display: "flex", justifyContent: "flex-end" }}
												>
													<Button
														variant="contained"
														onClick={() =>
															editService(title, description, price, visibility)
														}
														sx={{ mt: 3, ml: 1 }}
													>
														Update Service
													</Button>
												</Box>
											</>
										)}
									</React.Fragment>
									<br></br>
									<Link to={`/viewservice/${service.id}`}>
										<i>Back to service</i>
									</Link>
								</>
							)}
						</Paper>
					</Container>
				</React.Fragment>
			</div>
		</>
	);
}
