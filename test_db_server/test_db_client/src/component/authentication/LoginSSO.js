import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

const getUserDataFromToken = (token) => {
  try {
    const decodedToken = jwt_decode(token);
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
    console.log(token)

    if (token) {
      const { roles, ic } = getUserDataFromToken(token);
      console.log('User Roles:', roles);
      console.log('User IC:', ic);

      // Uncomment and modify the navigation logic based on user roles
      // if (roles === 'student') {
      //   navigate('/landingPage', { state: { ...location.state, roles, ic } });
      // } else {
      //   navigate('/adminDashboard', { state: { ...location.state, roles, ic } });
      // }
    } 
    // else {
    //   navigate('/login');
    // }
  }, [navigate, location.state]);

  return <div>Placeholder content for LoginSSO component</div>;
}

export default LoginSSO;
