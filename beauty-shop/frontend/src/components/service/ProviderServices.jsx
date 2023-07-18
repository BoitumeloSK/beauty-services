import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ProviderServices() {
	const [services, setServices] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	useEffect(() => {
		const getServices = async () => {
			// try {
			const getMethod = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};
			fetch(`api/services/myservices/${user.id}`, getMethod)
				.then((response) => response.json())
				.then((result) => {
					setServices(result.data);
					setIsLoading(false);
				});
			// } catch (error) {
			// 	console.log(error);
			// 	setIsLoading(false);
			// }
		};
		getServices();
	}, [user.id]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!services) {
		return <div>No data found.</div>;
	}
	return (
		<>
			{services.map((service, index) => {
				return (
					<div key={index}>
						<img src={service.images.split(",")[0]} alt="Service Poster" />
						<p>{service.title}</p>
						<p>{service.price}</p>
						<Link to={`/viewservice/${service.id}`}>
							<button>View Service</button>
						</Link>
					</div>
				);
			})}
		</>
	);
}
