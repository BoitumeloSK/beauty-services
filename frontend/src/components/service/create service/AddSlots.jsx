import AvailabilityCalendar from "../../Calendar";

export default function AddSlots({
	slotList,
	slotFunction,
	changeFunction,
	duplicateMsg,
	slotCopy,
}) {
	return (
		<div className="center">
			<AvailabilityCalendar availableDates={slotCopy} />
			{slotList.map((x, i) => {
				return <p key={i}>{x.split("T").join(" ")}</p>;
			})}
			{duplicateMsg ? <>Slot already added</> : ""}
			<div>
				<label htmlFor="dateTime">Date:</label>
				<input
					name="dateTime"
					type="datetime-local"
					onChange={changeFunction}
				/>
				<button onClick={slotFunction}>Add Slot</button>
			</div>
		</div>
	);
}
