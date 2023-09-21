import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetSlots from "./GetSlots";

export default function ViewBooking() {
	const [booking, setBooking] = useState();
	const [isLoading, setLoading] = useState(true);
	const [showSlots, setShowSlots] = useState(false);
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	useEffect(() => {
		const getBooking = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				};
				fetch(`/api/bookings/${id}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						setBooking(result.data[0]);
						setLoading(false);
					});
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getBooking();
	}, [id]);
	function slots() {
		setShowSlots(true);
	}
	function reschedule(id) {
		const editMethod = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				SlotId: id,
			}),
		};
		fetch(`/api/bookings/reschedule/${booking.id}`, editMethod)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			});
	}

	if (isLoading) {
		return <>Loading...</>;
	}
	if (!booking) {
		return <>Data not found</>;
	}
	return (
		<>
			<h2>{booking.Service.title}</h2>
			<p>{booking.Service.description}</p>
			{!booking.fulfilled ? (
				<>Service Cost: {booking.Service.price}</>
			) : (
				<>Paid: {booking.totatlPaid}</>
			)}
			<br></br>
			{user.id === booking.UserId ? (
				<button onClick={() => slots()}>Reschedule</button>
			) : (
				""
			)}
			{user.id === booking.Service.UserId ? (
				<button>Service Complete</button>
			) : (
				""
			)}
			{showSlots ? (
				<GetSlots
					user={booking.UserId}
					serviceId={booking.Service.id}
					preferredFunction={reschedule}
					ownerId={booking.Service.UserId}
					btnTxt={"Change Slot"}
				/>
			) : (
				""
			)}
		</>
	);
}
