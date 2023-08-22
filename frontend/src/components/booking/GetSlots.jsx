import { useState, useEffect } from "react";
export default function GetSlots({
	user,
	serviceId,
	preferredFunction,
	ownerId,
	btnTxt,
	chosen,
}) {
	const [slots, setSlots] = useState([]);
	const [slotId, setSlotId] = useState();
	const [isActive, setActive] = useState(null);
	useEffect(() => {
		const getSlots = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/slots/unbookedSlots/${serviceId}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						if (result.success) {
							setSlots(result.data);
						}
					});
			} catch (error) {
				console.log(error);
			}
		};
		getSlots();
	}, [serviceId]);
	function showBookingBtn(id) {
		setActive(id);
		setSlotId(id);
	}

	return (
		<>
			{slots.length > 0 ? (
				<div className="grid-container">
					{slots.map((x, i) => {
						//Not too sure about this so query
						let regex = /\d{4}-\d{2}-\d{2}/;
						let reg2 = /\d{2}:\d{2}/;
						let date = x.startTime.match(regex);
						let time = x.startTime.match(reg2);
						return (
							<>
								{date == chosen ? (
									<div key={i}>
										<button
											onClick={() => {
												showBookingBtn(x.id);
											}}
											className={isActive === x.id ? "btn" : "no-style-btn"}
										>{`${time}`}</button>
										{slotId === x.id && ownerId !== user.id ? (
											<button onClick={() => preferredFunction(slotId)}>
												{btnTxt}
											</button>
										) : (
											""
										)}
										<br></br>
									</div>
								) : (
									""
								)}
							</>
						);
					})}
				</div>
			) : (
				""
			)}
		</>
	);
}
