import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//MUI Related
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function CategoryServices() {
	const category = document.location.href.split("/").pop();
	// const { category } = useParams;
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
				fetch(`/api/services/category/${category}`, getMethod)
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
	}, [category]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!services) {
		return <div>No data found.</div>;
	}
	return (
		<>
			<>
				<div className="center">
					{category === "body" ? (
						<>
							<h1>BODY</h1>
							<p>
								There is a variety of hair, skin and body services. Filter the
								services type you would like to see.
							</p>
						</>
					) : category === "hair" ? (
						<>
							<h1>HAIR</h1>
							<p>
								There is a variety of hair, skin and body services. Filter the
								services type you would like to see.
							</p>
						</>
					) : (
						<>
							<h1>SKIN</h1>
							<p>
								There is a variety of hair, skin and body services. Filter the
								services type you would like to see.
							</p>
						</>
					)}
				</div>
				<Box sx={{ flexGrow: 1 }}>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						{services.map((service, index) => {
							return (
								<Grid item xs={2} sm={4} md={4} key={index}>
									<div key={index} className="service-card">
										<img
											src={service.images.split(",")[0]}
											alt="Service Poster"
										/>
										<h4>{service.title}</h4>
										<p>R {service.price}</p>
										<Link
											to={`/viewservice/${service.id}`}
											style={{ textDecoration: "none", color: "black" }}
										>
											VIEW SERVICE
										</Link>
									</div>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</>
		</>
	);
}
