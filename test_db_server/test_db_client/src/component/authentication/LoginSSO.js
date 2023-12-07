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
  const currentDate = new Date().toISOString();


  useEffect(() => {
    const token = Cookies.get('jwtToken');
  
    const fetchData = async () => {
      try {
        if (token) {
          // Send a request to backend for token verification
          const response = await fetch('/api/verify-jwt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwtToken: token }),
          });

          if (response.ok) {
            const { valid, decodedData } = await response.json();
            
            if (valid) {
              // Token is valid, proceed with decoding and additional data fetching
              const { ic } = getUserDataFromToken(token);
  
              // Make a request to your API endpoint or server
              const userResponse = await fetch('/api/get-sso-user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ic: ic }),
              });
  
              if (!userResponse.ok) {
                // Handle the case where the request for user data was not successful
                throw new Error(`Error: ${userResponse.status} - ${userResponse.statusText}`);
              }
  
              // Parse the JSON response for user data
              const userData = await userResponse.json();
              navigate('/landingPage', { state: { ...userData.user } });
            } else {
              // Token is not valid
              alert('Modification on token detected! Logging out...');
              console.error('Invalid token');
              Cookies.remove('jwtToken');
              window.location.href = `https://login.usm.my/adfs/ls/?wa=wsignout1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wreply=https://kebajikansiswa.usm.my&wctx=`;

            }
          } else {
            // Handle fetch error for token verification
            console.error('Error fetching verification result');
          }
        }
      } catch (error) {
        // Handle errors appropriately
        console.error(error);
      }
    };
    fetchData();
  }, [navigate, location]);


  // Render some content
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default LoginSSO;
