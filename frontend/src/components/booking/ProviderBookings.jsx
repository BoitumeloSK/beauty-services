import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function ProviderBookings() {
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
						console.log(result);
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
		<>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Service Slot</th>
						<th>Price</th>
						<th>Fulfillment</th>
						<th>Booking Actions</th>
					</tr>
				</thead>
				{bookings.map((booking) => {
					return (
						<tbody>
							<tr key={booking.id}>
								<td>{booking.Service.title}</td>
								<td>{booking.Slot.startTime}</td>
								<td>{booking.Service.price}</td>
								<td>{booking.fulfilled === false ? "pending" : "complete"}</td>
								<td>
									{booking.fulfilled === false ? (
										<button onClick={() => completeService(booking.id)}>
											Service Complete
										</button>
									) : (
										""
									)}
								</td>
							</tr>
						</tbody>
					);
				})}
			</table>
		</>
	);
}
