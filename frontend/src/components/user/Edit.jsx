import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function AddAbout(name, { changeFunction }, about) {
  return (
    <>
      <label htmlFor={name}>About:</label>
      <textarea name={name} onChange={() => changeFunction}>
        {about}
      </textarea>
    </>
  );
}

export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("beauty-shop-user"));

  const [fName, setFName] = useState(user.firstName);
  const [lName, setLName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [address, setAddress] = useState(user.address);

  function handleChange(e) {
    if (e.target.name === "fName") {
      setFName(e.target.value);
    }
    if (e.target.name === "lName") {
      setLName(e.target.value);
    }
    if (e.target.name === "about") {
      setAbout(e.target.value);
      console.log(e);
    }
    if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  }

  function confirmEdit(fName, lName, about, address) {
    const editMethod = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: fName,
        lastName: lName,
        about: about,
        address: address,
      }),
    };

    fetch(`/api/users/${user.id}`, editMethod)
      .then((response) => response.json())
      .then((result) => {
        const getMethod = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch(`/api/users/${user.id}`, getMethod)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            localStorage.setItem(
              "beauty-shop-user",
              JSON.stringify(result.data[0])
            );
            window.location.replace("/profile");
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Fragment>
      <label htmlFor="fName">First Name:</label>
      <input name="fName" onChange={(e) => handleChange(e)} value={fName} />
      <label htmlFor="lName">Last Name:</label>
      <input name="lName" onChange={(e) => handleChange(e)} value={lName} />
      {user.role === "provider" ? (
        <AddAbout name="about" changeFunction={handleChange} about={about} />
      ) : (
        ""
      )}
      <label htmlFor="address">Address:</label>
      <input name="address" onChange={(e) => handleChange(e)} value={address} />
      <br></br>
      <button onClick={() => confirmEdit(fName, lName, about, address)}>
        Confirm Edit
      </button>
      <Link to="/profile">Back</Link>
    </Fragment>
  );
}