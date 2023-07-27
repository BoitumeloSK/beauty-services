import { Fragment, useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDenied, setAccess] = useState(false);

  function handleChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }

  function loginUser(email, password) {
    const loginMethod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("api/users/login/user", loginMethod)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          localStorage.setItem(
            "beauty-shop-user",
            JSON.stringify(result.data[0])
          );
          window.location.replace("/");
        } else {
          setAccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <Fragment>
      <label htmlFor="email">Email</label>
      <input name="email" onChange={(e) => handleChange(e)} />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        onChange={(e) => handleChange(e)}
      />
      {loginDenied ? <p>Invalid Credentials</p> : ""}
      <button onClick={() => loginUser(email, password)}>Login</button>
    </Fragment>
  );
}
