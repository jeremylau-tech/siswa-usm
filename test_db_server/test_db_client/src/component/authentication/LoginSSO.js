import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
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
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    console.log(token);

    const fetchData = async () => {
      try {
        if (token) {
          const { roles, ic } = getUserDataFromToken(token);
          console.log('User Roles:', roles);
          console.log('User IC:', ic);

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

          // Update the state with the fetched user data
          console.log(result.user)
          setUserData(result.user);

          // Uncomment and modify the navigation logic based on user roles
          // if (roles === 'student') {
          //   navigate('/landingPage', { state: { ...location.state, roles, ic } });
          // } else {
          //   navigate('/adminDashboard', { state: { ...location.state, roles, ic } });
          // }
        } else {
          // Handle the case where the token is not available
          navigate('/login');
        }
      } catch (error) {
        // Handle errors and update the error state
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        // Update the loading state regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [navigate, location.state]);

  // Render some content
  return (
    <div>
      <h1>LoginSSO Page</h1>
      <p>This is a placeholder content for the LoginSSO component.</p>
    </div>
  );
}

export default LoginSSO;
