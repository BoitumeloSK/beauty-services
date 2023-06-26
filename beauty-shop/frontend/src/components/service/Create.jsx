import { useState } from "react";

export default function CreateService() {
  const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
}
