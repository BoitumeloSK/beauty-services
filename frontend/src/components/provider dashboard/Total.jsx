import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Total({ bookings }) {
	function getDate() {
		const date = new Date();
		let currentDay = String(date.getDate()).padStart(2, "0");
		let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
		let currentYear = date.getFullYear();
		return `${currentDay}-${currentMonth}-${currentYear}`;
	}
	function calculateTotal() {
		const date = new Date();
		let year = date.getFullYear();
		let completed = bookings.filter((x) => x.fulfilled == true);
		let bookingYear = completed.filter(
			(x) => String(x.createdAt.slice(0, 4)) == String(year)
		);
		let totalMade = 0;
		if (bookingYear.length > 0) {
			for (let i = 0; i < bookingYear.length; i++) {
				totalMade += bookingYear[i].totalPaid;
			}
		}
		return totalMade;
	}
	return (
		<React.Fragment>
			<h2>Total</h2>
			<Typography component="p" variant="h4">
				R {calculateTotal()}
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				Made this year as of <i>{getDate()}</i>
			</Typography>
		</React.Fragment>
	);
}
