import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddImages from "./AddImages";
import ServiceForm from "./ServiceForm";
import { useState } from "react";
import AddSlots from "./AddSlots";

const steps = [
	"Upload service images",
	"Add service date and time slots",
	"Service details",
];

export default function CreateService() {
	const [activeStep, setActiveStep] = React.useState(0);
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [urls, setUrls] = useState([]);
	const [startTime, setStartTime] = useState("");
	const [slotList, setSlotsList] = useState([]);
	const [duplicateMsg, setDuplicateMsg] = useState(false);
	const [visible, setVisibility] = useState(false);
	const [category, setCategory] = useState();
	const [slotCopy, setSlotCopy] = useState([]);
	const [complete, setComplete] = useState(false);

	function handleChange(e) {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		}
		if (e.target.name === "description") {
			setDescription(e.target.value);
		}
		if (e.target.name === "images") {
			const data = new FormData();
			data.append("file", e.target.files[0]);
			data.append("upload_preset", "beauty-shop");
			const imageMethod = {
				method: "POST",
				body: data,
			};

			fetch(
				"https://api.cloudinary.com/v1_1/dhrftaik2/image/upload",
				imageMethod
			)
				.then((res) => res.json())
				.then((result) => {
					setUrls([...urls, result.url]);
				});
		}
		if (e.target.name === "price") {
			setPrice(e.target.value);
		}
		if (e.target.name === "dateTime") {
			setStartTime(e.target.value);
		}
		if (e.target.name === "visibility") {
			setVisibility(e.target.checked);
		}
		if (e.target.name === "category") {
			setCategory(e.target.value);
		}
	}
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<AddImages urls={urls} changeFunction={(e) => handleChange(e)} />
				);
			case 1:
				return (
					<AddSlots
						slotList={slotList}
						slotFunction={() => addSlot()}
						duplicateMsg={duplicateMsg}
						changeFunction={(e) => handleChange(e)}
						slotCopy={slotCopy}
						deleteFunction={removeSlot}
					/>
				);
			case 2:
				return <ServiceForm changeFunction={(e) => handleChange(e)} />;
			default:
				throw new Error("Unknown step");
		}
	}
	function addSlot() {
		let found = slotList.filter((x) => x === startTime);
		if (found.length > 0) {
			setDuplicateMsg(true);
		} else {
			setDuplicateMsg(false);
			setSlotsList([...slotList, startTime]);
			setSlotCopy([...slotCopy, startTime.split("T")[0]]);
		}
	}
	//For removing slot in create
	function removeSlot(slot) {
		//updates the slot list that will be added to created service
		let updatedSlots = slotList.filter((x) => x !== slot);
		//updates the dates highlighted on a calendar
		let duplicateSlots = slotCopy.filter((x) => x === slot.split("T")[0]);

		//Changed state directly
		if (duplicateSlots.length > 1) {
			for (let i = 0; i < slotCopy.length; i++) {
				if (slotCopy[i] === slot.split("T")[0]) {
					slotCopy.splice(i, 1);
					break; // Stop after removing the first occurrence
				}
			}
		} else {
			let calendarSlots = slotCopy.filter((x) => x != slot.split("T")[0]);
			setSlotCopy(calendarSlots);
		}
		setSlotsList(updatedSlots);
	}

	function addService(description, price, title, visible, category) {
		const createMethod = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				UserId: user.id,
				description,
				price,
				title,
				visible,
				category,
				images: urls.join(","),
			}),
		};
		fetch("api/services", createMethod)
			.then((response) => response.json())
			.then((result) => {
				if (result.success) {
					slotList.forEach((x) => {
						const addMethod = {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								ServiceId: result.data.id,
								startTime: x,
							}),
						};
						fetch("api/slots", addMethod)
							.then((response) => response.json())
							.then((result) => {
								if (result.success) {
									setComplete(true);
								} else {
									console.log(result.error);
								}
							});
					});
				} else {
					console.log(result.error);
				}
			});
	}

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<div
			style={{
				position: "absolute",
				height: "auto",
				width: "100%",
				backgroundImage: `url("https://res.cloudinary.com/dhrftaik2/image/upload/v1692003783/beauty-shop/Site%20Images/josh-calabrese-XXpbdU_31Sg-unsplash-copy_ewguoh.jpg")`,
				backgroundSize: "cover",
			}}
		>
			<CssBaseline />
			<Container component="main" maxWidth="md" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography component="h1" variant="h4" align="center">
						Create New Service
					</Typography>
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{complete ? (
						<div className="center">
							<Typography variant="h5" gutterBottom>
								Service has been created.
							</Typography>
							<Typography variant="subtitle1">
								To view your service, you may go to
								<Link to="/myservices">my services.</Link>
							</Typography>
						</div>
					) : (
						<React.Fragment>
							{getStepContent(activeStep)}
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
										Back
									</Button>
								)}
								{activeStep === steps.length - 1 ? (
									<Button
										variant="contained"
										onClick={() =>
											addService(description, price, title, visible, category)
										}
										sx={{ mt: 3, ml: 1 }}
									>
										Add Service
									</Button>
								) : (
									<Button
										variant="contained"
										onClick={handleNext}
										sx={{ mt: 3, ml: 1 }}
									>
										Next
									</Button>
								)}
							</Box>
						</React.Fragment>
					)}
				</Paper>
			</Container>
		</div>
	);
}
