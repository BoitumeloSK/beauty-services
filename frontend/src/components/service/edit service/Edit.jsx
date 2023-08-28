import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AvailabilityCalendar from "../../Calendar";

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
							});
					});
			} catch (error) {
				setIsLoading(false);
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
					console.log(result);
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
				window.location.replace(`/viewservice/${service.id}`);
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
			<React.Fragment>
				<CssBaseline />
				<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
					<Paper
						variant="outlined"
						sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
					>
						<Typography component="h1" variant="h4" align="center">
							Edit Service
						</Typography>
						<button onClick={() => changeEditView(false)}>Change slots</button>
						<button onClick={() => changeEditView(true)}>
							Change service details
						</button>
						<br></br>
						<React.Fragment>
							{editView == true ? (
								<>
									<AvailabilityCalendar
										availableDates={slots}
										user={user}
										serviceId={id}
										preferredFunction={deleteSlot}
										btnTxt={"X"}
										getSlots={true}
									/>
									{slots.map((x) => {
										let regex = /\d{4}-\d{2}-\d{2}/;
										let reg2 = /\d{2}:\d{2}/;
										let date = x.startTime.match(regex);
										let time = x.startTime.match(reg2);
										return (
											<div key={x.id}>
												<input
													type="button"
													name={x.id}
													onClick={(e) => changeDateTime(e, x.id, x.startTime)}
													value={`${date} ${time}`}
												/>
												<button onClick={() => deleteSlot(x.id)}>X</button>
												<br></br>
											</div>
										);
									})}
									<input
										type="datetime-local"
										name="dateTime"
										onChange={(e) => handleChange(e)}
										defaultValue={dateTime.slice(0, 16)}
									/>
									<button onClick={() => changeSlot(slotId)}>
										Change Slot
									</button>
									<br></br>
									{duplicateMsg ? <>Slot already added</> : ""}
									<label htmlFor="newDateTime">Add Slot:</label>
									<input
										type="datetime-local"
										name="newDateTime"
										onChange={(e) => handleChange(e)}
									/>
									<button onClick={() => addSlot()}>Add Slot</button>
								</>
							) : (
								<>
									<label htmlFor="title">Title: </label>
									<input
										name="title"
										defaultValue={service.title}
										onChange={(e) => handleChange(e)}
									/>
									<br></br>
									<label htmlFor="description">Description: </label>
									<textarea
										name="description"
										defaultValue={service.description}
										onChange={(e) => handleChange(e)}
									></textarea>
									<br></br>
									<label htmlFor="price">Price: </label>
									<input
										type="number"
										name="price"
										defaultValue={service.price}
										onChange={(e) => handleChange(e)}
									/>

									<br></br>
									<label htmlFor="visibility">Visibility: </label>
									<input
										type="checkbox"
										name="visibility"
										onChange={(e) => handleChange(e)}
										defaultChecked={service.visible}
									/>
									<br></br>
									<button
										onClick={() =>
											editService(title, description, price, visibility)
										}
									>
										Update Service
									</button>
								</>
							)}
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
						</React.Fragment>
					</Paper>
				</Container>
			</React.Fragment>
		</>
	);
}
