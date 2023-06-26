import { Fragment } from "react";
import { Link } from "react-router-dom";
function NoAccess() {
  return (
    <>
      <Link to="/signup">Sign Up</Link>
      <br></br>
      <Link to="login">Login</Link>
    </>
  );
}
function logout() {
  const logoutMethod = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("api/users/logout", logoutMethod)
    .then((response) => response.json())
    .then((result) => {
      localStorage.removeItem("beauty-shop-user");
      window.location.replace("/");
    })
    .catch((error) => console.log("error", error));
}

function GrantedAccess() {
  const storageKey = JSON.parse(localStorage.getItem("beauty-shop-user"));
  return (
    <>
      {storageKey.role === "admin" ? (
        <Link to="/applications">Applications</Link>
      ) : (
        ""
      )}
      <Link to="/profile">View Profile</Link>
      <br></br>
      <Link to="/changePassword">Change Password</Link>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
export default function Home() {
  const storageKey = localStorage.getItem("beauty-shop-user");

  return (
    <Fragment>
      <h1>This it the home page</h1>
      {storageKey === null ? <NoAccess /> : <GrantedAccess />}
    </Fragment>
  );
}
