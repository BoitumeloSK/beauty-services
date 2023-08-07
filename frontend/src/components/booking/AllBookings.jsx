import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function AllBookings() {
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
				fetch("/api/bookings", getMethod)
					.then((response) => response.json())
					.then((result) => {
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
								</td>
							</tr>
						</tbody>
					);
				})}
			</table>
		</>
	);
}
