import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function ViewProfile() {
  const user = JSON.parse(localStorage.getItem("beauty-shop-user"));

  const firstName = user.firstName;
  const lastName = user.lastName;
  const email = user.email;
  const about = user.about;
  const address = user.address;

  function deleteUser() {
    const deleteMethod = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`api/users/${user.id}`, deleteMethod)
      .then((response) => response.json())
      .then((result) => {
        localStorage.removeItem("beauty-shop-user");
        window.location.replace("/");
      });
  }

  return (
    <Fragment>
      {firstName}
      <br></br>
      {lastName}
      <br></br>
      {email}
      <br></br>
      {about}
      <br></br>
      {address}
      <br></br>
      <Link to="/edit/Profile">Edit Profile</Link>
      <br></br>
      <Link to="/">Back</Link>
      <br></br>
      <button onClick={() => deleteUser()}>Delete Account</button>
    </Fragment>
  );
}
