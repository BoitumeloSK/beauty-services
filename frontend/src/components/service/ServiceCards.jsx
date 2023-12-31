import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//MUI Related
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function ServiceCards({ title, pageInfo }) {
	return (
		<>
			<div className="center">
				<h1>{title}</h1>
				<p>{pageInfo}</p>
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
	);
}
