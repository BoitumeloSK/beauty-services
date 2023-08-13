import React, { Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class AvailabilityCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableDates: this.props.availableDates || [], // Replace with your available dates
			selectedDate: new Date(),
		};
	}
	componentDidUpdate(prevProps) {
		if (this.props.availableDates !== prevProps.availableDates) {
			this.setState({
				availableDates: this.props.availableDates || [],
			});
		}
	}
	handleDateClick = (date) => {
		return date.toISOString().split("T")[0];
	};
	retreiveDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	render() {
		const { availableDates, selectedDate } = this.state;

		return (
			<div>
				<Calendar
					tileContent={({ date, view }) =>
						view === "month" &&
						availableDates.includes(this.retreiveDate(date)) ? (
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
