import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class AvailabilityCalendar extends Component {
	state = {
		availableDates: this.props.availableDates || [], // Replace with your available dates
		selectedDate: new Date(),
	};
	handleDateClick = (date) => {
		console.log(date.toISOString());
	};

	render() {
		const { availableDates, selectedDate } = this.state;
		return (
			<div>
				<Calendar
					tileContent={({ date, view }) =>
						view === "month" &&
						availableDates.includes(date.toISOString().split("T")[0]) ? (
							<div className="highlighted-date"></div>
						) : null
					}
					value={selectedDate}
					onChange={(selectedDate) => this.setState({ selectedDate })}
					onClickDay={this.handleDateClick}
				/>
			</div>
		);
	}
}

export default AvailabilityCalendar;
