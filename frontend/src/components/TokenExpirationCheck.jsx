// useTokenExpirationCheck.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const TokenExpirationCheck = () => {
	const location = useLocation();

	const checkTokenExpiration = () => {
		const token = localStorage.getItem("JWT-Token");

		if (token) {
			const decodedToken = jwt_decode(token);
			const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
			const currentTime = Date.now(); // Current time in milliseconds
			if (currentTime > expirationTime) {
				const removeCookie = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};
				fetch("/api/users/logout", removeCookie)
					.then((response) => response.json())
					.then((result) => {
						localStorage.removeItem("beauty-shop-user");
						localStorage.removeItem("JWT-Token");
						document.location.replace("/login");
					});
			}
		}
	};

	// Run the token expiration check on every route change
	useEffect(() => {
		checkTokenExpiration();
	}, [location]);

	// Run the initial check when the component mounts
	useEffect(() => {
		checkTokenExpiration();
	}, []);

	return null;
};

export default TokenExpirationCheck;
