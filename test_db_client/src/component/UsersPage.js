import React, { useState, useEffect } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

  useEffect(() => {
    // Fetch all users from the server
    fetch("http://docker.usm.my:8000/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch user details for each user and store them in userDetails state
    fetch("http://docker.usm.my:8000/user-details")
    .then((res) => res.json())
    .then((data) => {
      if (data.userDetails) {
        // Convert the array of user details into a map
        const detailsMap = {};
        data.userDetails.forEach((detail) => {
          detailsMap[detail.unique_id] = detail;
        });
        setUserDetailsMap(detailsMap);
      }
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
}, []);

return (
  <div>
    <h1>List of Users and User Details</h1>
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Matric Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>IC Number</th>
            <th>Student Status</th>
            <th>Study Year</th>
            <th>Phone Number</th>
            <th>School</th>
            {/* Add more columns for other user details */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.unique_id}>
              <td>{user.unique_id}</td>
              <td>{userDetailsMap[user.unique_id]?.name}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>{userDetailsMap[user.unique_id]?.ic_num}</td>
              <td>{userDetailsMap[user.unique_id]?.student_status}</td>
              <td>{userDetailsMap[user.unique_id]?.study_year}</td>
              <td>{userDetailsMap[user.unique_id]?.phone_num}</td>
              <td>{userDetailsMap[user.unique_id]?.school}</td>
              {/* Add more cells for other user details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default UsersPage;