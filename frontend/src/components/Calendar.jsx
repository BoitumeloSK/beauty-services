import React, { Component } from "react";
import Calendar from "react-calendar";
import GetSlots from "./booking/GetSlots";
import "react-calendar/dist/Calendar.css";
import ServiceTimes from "./service/create service/ServiceTimes";

class AvailabilityCalendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			availableDates: this.props.availableDates || [], // Replace with your available dates
			selectedDate: new Date(),
			chosenDate: "",
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
		// console.log(date.toISOString().split("T")[0]);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		this.setState({
			chosenDate: `${year}-${month}-${day}`,
		});
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
			<div className="center">
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
				<br></br>
				{this.props.getSlots === true ? (
					<GetSlots
						user={this.props.user}
						serviceId={this.props.serviceId}
						preferredFunction={this.props.preferredFunction}
						ownerId={this.props.ownerId}
						btnTxt={this.props.btnTxt}
						chosen={this.state.chosenDate}
						updateFunction={this.props.updateFunction}
					/>
				) : (
					<ServiceTimes
						chosen={this.state.chosenDate}
						slots={this.props.slots}
						deleteFunction={this.props.deleteFunction}
					/>
				)}
			</div>
		);
	}
}

export default AvailabilityCalendar;
