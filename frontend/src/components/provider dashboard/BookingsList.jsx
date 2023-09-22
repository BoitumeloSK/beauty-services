import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

export default function BookingsList({ bookings }) {
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
	return (
		<React.Fragment>
			<Typography component="h2" variant="h4" align="center" margin={1}>
				Bookings
			</Typography>
			{bookings ? (
				<>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Fulfillment</TableCell>
								<TableCell>Booking Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bookings.map((booking) => (
								<TableRow key={booking.id}>
									<TableCell>{booking.Slot.startTime}</TableCell>
									<TableCell>{booking.Service.title}</TableCell>
									<TableCell>{booking.Service.price}</TableCell>
									<TableCell>
										{booking.fulfilled === false ? "pending" : "complete"}
									</TableCell>
									<TableCell align="right">
										{booking.fulfilled === false ? (
											<button onClick={() => completeService(booking.id)}>
												Service Complete
											</button>
										) : (
											""
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			) : (
				"No bookings made yet"
			)}
		</React.Fragment>
	);
}
