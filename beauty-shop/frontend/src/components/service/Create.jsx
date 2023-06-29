import { useState } from "react";

export default function CreateService() {
  const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [urls, setUrls] = useState([]);
  const [price, setPrice] = useState("");

  function handleChange(e) {
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
    if (e.target.name === "images") {
      setImages(e.target.files);
    }
    if (e.target.name === "price") {
      setPrice(e.target.value);
    }
  }

  function postImages() {
    const photosArray = [];
    Array.from(images).forEach((image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "beauty-shop");

      const imageMethod = {
        method: "POST",
        body: data,
      };

      fetch(
        "https://api.cloudinary.com/v1_1/dhrftaik2/image/upload",
        imageMethod
      )
        .then((res) => res.json())
        .then((result) => {
          photosArray.push(result.url);
          //setUrls([...urls, result.url]);

          console.log(result.url);
          console.log(urls);
        });
    });
    setUrls(photosArray);
  }

  function check() {
    console.log(urls);
  }

  return (
    <>
      <label htmlFor="description">Description: </label>
      <textarea name="description" onChange={(e) => handleChange(e)}></textarea>
      <label htmlFor="images">Images: </label>
      <input
        name="images"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="price">Price: </label>
      <input name="price" type="number" onChange={(e) => handleChange(e)} />
      <button onClick={() => postImages()}>Post Images</button>
      <button onClick={() => check()}>Check</button>
    </>
  );
}
