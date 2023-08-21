import AvailabilityCalendar from "../../Calendar";

export default function AddSlots({
	slotList,
	slotFunction,
	changeFunction,
	duplicateMsg,
	slotCopy,
	deleteFunction,
}) {
	return (
		<div className="center">
			<AvailabilityCalendar
				availableDates={slotCopy}
				getSlots={false}
				slots={slotList}
				deleteFunction={deleteFunction}
			/>
			{duplicateMsg ? <p style={{ color: "red" }}>Slot already added</p> : ""}
			<div>
				<input
					name="dateTime"
					type="datetime-local"
					onChange={changeFunction}
				/>
				<button onClick={slotFunction} className="slot-btn">
					ADD SLOT
				</button>
			</div>
		</div>
	);
}
