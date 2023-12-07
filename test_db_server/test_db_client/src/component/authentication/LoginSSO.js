import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const getUserDataFromToken = function (token) {
  try {
    const decodedToken = jwtDecode(token); // decode your token here
    return {
      roles: decodedToken.roles || 'default',
      ic: decodedToken.ic || null,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { roles: 'default', ic: null };
  }
};

function LoginSSO() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
  
    const fetchData = async () => {
      try {
        if (token) {
          const { ic } = getUserDataFromToken(token); 
  
          // Make a request to your API endpoint or server
          const response = await fetch('/api/get-sso-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // You can pass any necessary parameters here
            body: JSON.stringify({ ic: ic }),
          });
  
          if (!response.ok) {
            // Handle the case where the request was not successful
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
  
          // Parse the JSON response
          const result = await response.json();
          const user = result.user;
          navigate('/landingPage', { state: { ...user} });
        }
      } catch (error) {
        // Handle errors appropriately
        console.error(error);
      }
    };
  
    // Call the fetchData function
    fetchData();
  }, [navigate, location.state]);

  // Render some content
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default LoginSSO;
