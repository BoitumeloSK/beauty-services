import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function MyBookings() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getBookings = async () => {
			try {
				const getMethod = {
					mehtod: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch("/api/bookings/mybookings/list", getMethod)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setBookings(result.data);
						setLoading(false);
					});
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		getBookings();
	}, []);

	function deleteBooking(x) {
		const deleteMethod = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/bookings/${x}`, deleteMethod)
			.then((response) => response.json())
			.then((result) => {
				window.location.reload();
			});
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!bookings) {
		return <div>No data found.</div>;
	}
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Fulfillment</th>
						<th></th>
					</tr>
				</thead>
				{bookings.map((booking) => {
					return (
						<tbody>
							<tr key={booking.id}>
								<td>{booking.Service.title}</td>
								<td>{booking.Service.price}</td>
								<td>{booking.fulfilled}</td>
								<td>
									<Link to={`/viewbooking/${booking.id}`}>
										<button>View Booking</button>
									</Link>{" "}
									|
									<button onClick={() => deleteBooking(booking.id)}>
										Delete Booking
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</table>
		</>
	);
}
