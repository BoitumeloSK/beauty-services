import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
	Text,
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
			<h2>This Year</h2>
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
							position="middle"
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
						label={
							<Text x={0} y={-20} dx={50} dy={150} offset={0} angle={-90}>
								Services (R)
							</Text>
						}
					/>
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
