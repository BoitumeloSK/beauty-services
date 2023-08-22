export default function ServiceTimes(slots) {
	//for some reason slots comes returns an object and not an array

	return (
		<>
			{slots.slots.map((x, i) => {
				let regex = /\d{4}-\d{2}-\d{2}/;
				let reg2 = /\d{2}:\d{2}/;
				let date = x.match(regex);
				let time = x.match(reg2);
				return (
					<div key={i}>
						{date == slots.chosen ? (
							<div className="flex-and-center">
								<span>{time}</span>
								<button
									onClick={() => slots.deleteFunction(x)}
									className="slot-delete"
								>
									X
								</button>
							</div>
						) : (
							""
						)}
						{/* <p>{x.split("T").join(" ")}</p> */}
					</div>
				);
			})}
		</>
	);
}
