import React, { useState } from "react";

function InsertPage() {
    const [formData, setFormData] = useState({
      name: "",
      matric_number: "",
      course_taken: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
        // Define the URL for your server's /users endpoint
    const apiUrl = "http://docker.usm.my:8000/api/insert"; // Update with your server's URL

    // Create a POST request to send the formData to the server
    fetch(apiUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
        if (response.ok) {
            // If the server responds with a 200 status code (OK), you can handle success here
            console.log("Form data sent successfully!");
            // You can also reset the form or perform other actions on success
            // Show an alert to indicate success
        alert("Form data submitted successfully!");

        // Reset the form fields by clearing the formData state
        setFormData({
          name: "",
          matric_number: "",
          course_taken: "",
        });
        } else {
            // Handle errors or display error messages here
            console.error("Form data submission failed.");
            alert("Something wrong on the backend!");
        }
        })
        .catch((error) => {
        console.error("Error sending form data:", error);
        });
        console.log(formData);
    };
  
    return (
      <div>
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="matric_number">Matric Number:</label>
            <input
              type="text"
              id="matric_number"
              name="matric_number"
              value={formData.matric_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="course_taken">Course Taken:</label>
            <input
              type="text"
              id="course_taken"
              name="course_taken"
              value={formData.course_taken}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default InsertPage;