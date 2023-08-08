import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export default function CategoryServices() {
	const { category } = useParams;
	const [services, setServices] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getServices = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/services/hair`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						setServices(result.data);
						setIsLoading(false);
					});
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		getServices();
	});

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
