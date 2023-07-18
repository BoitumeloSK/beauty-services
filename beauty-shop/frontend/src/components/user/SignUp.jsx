import { Fragment, useState } from "react";
export default function SignUp() {
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [about, setAbout] = useState("I am a customer");
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [userOption, setUserOption] = useState();

  function handleChange(e) {
    if (e.target.name === "fName") {
      setFName(e.target.value);
    }
    if (e.target.name === "lName") {
      setLName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirm") {
      setConfirmPassword(e.target.value);
    }
    if (e.target.name === "about") {
      setAbout(e.target.value);
    }
    if (e.target.name === "address") {
      setAddress(e.target.value);
    }
    if (e.target.name === "user") {
      setUserOption(e.target.value);
    }
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    }
  }

  function createUser(
    fName,
    lName,
    email,
    password,
    confirmPassword,
    about,
    address
  ) {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "beauty-shop");
    const imageMethod = {
      method: "POST",
      body: data,
    };
    fetch("https://api.cloudinary.com/v1_1/dhrftaik2/image/upload", imageMethod)
      .then((res) => res.json())
      .then((result) => {
        const createMethod = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            about: about,
            address: address,
            image: result.url,
          }),
        };
        fetch("api/users", createMethod)
          .then((response) => response.json())
          .then((result) => {
            if (result.success === true) {
              window.location.replace("/");
            } else {
              console.log(result);
            }
          })
          .catch((error) => console.log("error", error));
      });
  }

  return (
    <Fragment>
      <label htmlFor="user">Sign up as:</label>
      <select name="user" id="choose-role" onChange={(e) => handleChange(e)}>
        <option value="select">Select a type of user</option>
        <option value="customer">Customer</option>
        <option value="provider">Service Provider</option>
      </select>
      <label htmlFor="fName">First Name</label>
      <input name="fName" required onChange={(e) => handleChange(e)} />
      <label htmlFor="lName">Last Name</label>
      <input name="lName" required onChange={(e) => handleChange(e)} />
      <label htmlFor="email">Email</label>
      <input name="email" required onChange={(e) => handleChange(e)} />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        required
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="confirm">Confirm Password</label>
      <input
        name="confirm"
        type="password"
        onChange={(e) => handleChange(e)}
        required
      />
      <label htmlFor="image">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        id="profile-image"
        name="image"
        required
        onChange={(e) => handleChange(e)}
      />
      {userOption === "provider" ? (
        <>
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            required
            onChange={(e) => handleChange(e)}
          ></textarea>
        </>
      ) : (
        about === "I am a customer"
      )}
      <label htmlFor="address">Address</label>
      <input name="address" onChange={(e) => handleChange(e)} />
      <button
        onClick={() =>
          createUser(
            fName,
            lName,
            email,
            password,
            confirmPassword,
            about,
            address
          )
        }
      >
        Sign Up
      </button>
    </Fragment>
  );
}
