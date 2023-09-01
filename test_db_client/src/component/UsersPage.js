import React, { useState, useEffect } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the server
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Matric Number</th>
              <th>Course Taken</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.matric_number}</td>
                <td>{user.course_taken}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
