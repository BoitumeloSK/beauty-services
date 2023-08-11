import { useState, useEffect } from "react";
export default function GetSlots({
	user,
	serviceId,
	preferredFunction,
	ownerId,
	btnTxt,
}) {
	const [slots, setSlots] = useState([]);
	const [slotId, setSlotId] = useState();
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
		setSlotId(id);
	}
	return (
		<>
			{slots.length > 0 ? (
				<>
					{slots.map((x, i) => {
						//Not too sure about this so query
						let regex = /\d{4}-\d{2}-\d{2}/;
						let reg2 = /\d{2}:\d{2}/;
						let date = x.startTime.match(regex);
						let time = x.startTime.match(reg2);

						return (
							<div key={i}>
								<button
									onClick={() => showBookingBtn(x.id)}
									key={i}
								>{`${date} ${time}`}</button>
								{slotId === x.id && ownerId !== user.id ? (
									<button onClick={() => preferredFunction(slotId)} key={i}>
										{btnTxt}
									</button>
								) : (
									""
								)}
								<br></br>
							</div>
						);
					})}
				</>
			) : (
				<>No available slots</>
			)}
		</>
	);
}
