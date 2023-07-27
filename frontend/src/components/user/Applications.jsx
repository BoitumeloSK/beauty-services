import { useEffect, useState } from "react";

export default function Applications() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch("api/users")
      .then((response) => response.json())
      .then((result) => {
        const users = result.data.filter(
          (x) => x.role === "customer" && x.about !== "I am a customer"
        );

        setApplicants(users);
      });
  }, []);

  function getUser(userId) {
    const getMethod = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`api/users/${userId}`, getMethod)
      .then((response) => response.json())
      .then((result) => {
        sessionStorage.setItem("single-user", JSON.stringify(result.data[0]));
        window.location.replace("/userProfile");
      });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Eamil</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => getUser(item.id)}>View Profile</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
