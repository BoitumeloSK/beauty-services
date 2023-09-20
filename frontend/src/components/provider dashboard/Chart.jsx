import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";

// Generate Sales Data

export default function Chart({ bookings }) {
	const theme = useTheme();
	function createData(time, amount) {
		return { time, amount };
	}

	function addData() {
		let data = [];
		const date = new Date();
		let year = date.getFullYear();
		let completed = bookings.filter((x) => x.fulfilled == true);
		let bookingYear = completed.filter(
			(x) => String(x.createdAt.slice(0, 4)) == String(year)
		);
		if (bookingYear.length > 0) {
			bookingYear.forEach((x) => {
				data.push(createData(`${x.createdAt.slice(6, 7)}`, x.totalPaid));
			});
		}
		return data;
	}

	return (
		<React.Fragment>
			<h2>Today</h2>
			<ResponsiveContainer>
				<LineChart
					data={addData()}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis
						dataKey="time"
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					>
						<Label
							angle={0}
							position="bottom"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Month of the Year
						</Label>
					</XAxis>
					<YAxis
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Services (R)
						</Label>
					</YAxis>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="amount"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
