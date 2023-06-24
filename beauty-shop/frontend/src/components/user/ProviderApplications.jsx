import { useEffect, useState } from "react";

export default function ProviderApplications() {
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
                  <button>View Profile</button>
                  <button>Approve</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
