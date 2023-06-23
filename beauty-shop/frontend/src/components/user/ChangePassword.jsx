import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const user = JSON.parse(localStorage.getItem("beauty-shop-user"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleChange(e) {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirm") {
      setConfirmPassword(e.target.value);
    }
  }

  function passwordChange(password, confirmPassword) {
    const passwordMethod = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        confirmPassword: confirmPassword,
      }),
    };
    fetch(`api/users/password/${user.id}`, passwordMethod)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          const getMethod = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch(`api/users/${user.id}`, getMethod)
            .then((response) => response.json())
            .then((result) => {
              localStorage.setItem(
                "beauty-shop-user",
                JSON.stringify(result.data[0])
              );
              window.location.replace("/");
            });
        } else {
          console.log(result.error);
        }
      });
  }

  return (
    <Fragment>
      <label htmlFor="password">New Password:</label>
      <input name="password" onChange={(e) => handleChange(e)} />
      <label htmlFor="confirm">Confirm New Password:</label>
      <input name="confirm" onChange={(e) => handleChange(e)} />
      {password !== confirmPassword ? <p>Passwords do not not match</p> : ""}
      <button onClick={() => passwordChange(password, confirmPassword)}>
        Submit
      </button>
      <Link to="/">Home</Link>
    </Fragment>
  );
}
