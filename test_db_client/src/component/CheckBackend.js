// CheckBackend.js
import React, { useState, useEffect } from 'react';

const CheckBackend = () => {
  const [dbMessage, setDbMessage] = useState('');
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    // Function to fetch data from "/check-db" endpoint
    const checkDbConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-db');
        const data = await response.json();

        if (response.ok) {
          setDbMessage(data.message);
        } else {
          setDbMessage('Error checking database connection');
        }
      } catch (error) {
        setDbMessage('Error checking database connection');
      }
    };

    // Function to fetch data from "/check-backend" endpoint
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/check-backend');
        const data = await response.json();

        if (response.ok) {
          setBackendMessage(data.message);
        } else {
          setBackendMessage('Error checking backend connection');
        }
      } catch (error) {
        setBackendMessage('Error checking backend connection');
      }
    };

    // Call the functions to fetch data
    checkDbConnection();
    checkBackendConnection();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
            <p><strong>Backend Connection Status: </strong>{backendMessage}</p>
            <p><strong>DB Connection Status: </strong>{dbMessage}</p>
    </div>
  );
};

export default CheckBackend;
