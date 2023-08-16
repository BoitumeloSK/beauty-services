import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AvailabilityCalendar from "../Calendar";
export default function ViewService() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const { id } = useParams();
	const [service, setService] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [ownerId, setOwnerId] = useState();
	const [displayImage, setDisplayImage] = useState("");
	const [slots, setSlots] = useState([]);
	const [last, setLast] = useState(false);
	useEffect(() => {
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
						setDisplayImage(result.data[0].images.split(",")[0]);
						setOwnerId(result.data[0].UserId);
						setIsLoading(false);
						let slotsArray = result.data[0].Slots.filter(
							(x) => x.booked === false
						);
						if (slotsArray.length > 0) {
							// Loop through the slotsArray and update each slot's startTime
							for (let i = 0; i < slotsArray.length; i++) {
								slotsArray[i] = slotsArray[i].startTime.slice(0, 10);
							}
							setSlots(slotsArray);
							setLast(true);
						}

						// Set the slots state with the modified slotsArray
					});
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		getService();
	}, [id]);
	useEffect(() => {});
	function deleteService() {
		const deleteMethod = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/services/${id}`, deleteMethod)
			.then((response) => response.json())
			.then((result) => {
				fetch(`api/slots/service/${id}`)
					.then((response) => response.json())
					.then((result) => {
						if (result.success) {
							window.location.replace("/myservices");
						} else {
							console.log(result.error);
						}
					});
			});
	}
	function createBooking(slotId) {
		const createMethod = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				SlotId: slotId,
				ServiceId: service.id,
			}),
		};
		fetch("/api/bookings", createMethod)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log(error));
	}
	function changeImage(url) {
		setDisplayImage(url);
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!service) {
		return <div>No data found.</div>;
	}

	return (
		<>
			<Card sx={{ display: "flex" }}>
				<CardContent sx={{ flex: 1 }}>
					<Typography component="h2" variant="h5">
						{service.title}
					</Typography>
					<Typography variant="subtitle1" paragraph>
						{service.description}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						R {service.price}
					</Typography>
					{user.id === service.UserId ? (
						<>
							<div className="service-btns">
								<button onClick={() => deleteService()}>DELETE</button>
								<Link to={`/editservice/${service.id}`}>
									<button>EDIT</button>
								</Link>
							</div>
							<br></br>
							<Link to="/myservices">Back to my services</Link>
						</>
					) : (
						""
					)}
					<Link to="/services">Back to services</Link>
				</CardContent>
				<CardMedia
					component="img"
					sx={{ width: 160, display: { xs: "none", sm: "block" } }}
					image={displayImage}
					alt=""
					style={{ height: "60vh" }}
				/>
			</Card>
			<div className="cards flex-space">
				<div className="center">
					{last && slots.length > 0 ? (
						<>
							<AvailabilityCalendar
								availableDates={slots}
								user={user}
								serviceId={id}
								preferredFunction={createBooking}
								ownerId={ownerId}
								btnTxt={"Book Now"}
							/>
							{/* <GetSlots
								user={user}
								serviceId={id}
								preferredFunction={createBooking}
								ownerId={ownerId}
								btnTxt={"Book Now"}
								chosen={"2023-10-01"}
							/> */}
						</>
					) : (
						""
					)}
				</div>
				<div className="service-pics">
					{service.images.split(",").map((url, index) => {
						return (
							<div key={index}>
								<img
									key={index}
									src={url}
									onClick={() => changeImage(url)}
									alt=""
									style={{ cursor: "pointer" }}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
