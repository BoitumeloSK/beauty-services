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
