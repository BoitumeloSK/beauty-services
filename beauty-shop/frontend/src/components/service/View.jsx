import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
export default function ViewService() {
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
	const { id } = useParams();
	const [service, setService] = useState();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getService = async () => {
			try {
				const getMethod = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch(`/api/services/${id}`, getMethod)
					.then((response) => response.json())
					.then((result) => {
						setService(result.data[0]);
						setIsLoading(false);
					});
			} catch (error) {
				console.log(error);
				setIsLoading(false);
			}
		};
		getService();
	}, [id]);
	function deleteService() {
		const deleteMethod = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(`/api/services/${id}`, deleteMethod)
			.then((response) => response.json())
			.then((result) => {
				window.location.replace("/myservices");
			});
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!service) {
		return <div>No data found.</div>;
	}

	return (
		<>
			<div>
				{service.images.split(",").map((url, index) => {
					return <img key={index} src={url} alt="" />;
				})}
			</div>
			<h2>{service.title}</h2>
			<p>{service.description}</p>
			<p>R {service.price}</p>
			{user.id === service.UserId ? (
				<>
					<button onClick={() => deleteService()}>Delete Service</button>
					<Link to={`/editservice/${service.id}`}>
						<button>Edit</button>
					</Link>
				</>
			) : (
				<>
					<Link to={`/makebooking/${service.id}`}>
						<button>Make Booking</button>
					</Link>
				</>
			)}
			<Link to="/myservices">Back to my services</Link>
		</>
	);
}
