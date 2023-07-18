import { useState } from "react";
import { useParams } from "react-router-dom";
export default function CreateBooking() {
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
}
