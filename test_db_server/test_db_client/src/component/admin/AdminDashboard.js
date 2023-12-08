import React, { useEffect } from 'react';
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';
import AnalyticGraph from "./AnalyticGraph";
import VendorListPage from "./vendor/VendorListPage";
import { useNavigate, useLocation } from 'react-router-dom';

function AdminDashboard(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Use a conditional check before navigating
    if (!location.state) {
      navigate('/WelcomePage');
    }
  }, [location.state, navigate]);

    if (location.state) {
    const user = location.state;
    return ( 
      <div className="App">
        <AnalyticDashboard /> 
        <Divider style={{ margin: '30px 0' }} />
        <AnalyticGraph />
        <Divider style={{ margin: '30px 0' }} />
        <ApplicationListPage user_roles={user.roles} unique_id={user.unique_id}/>
        <Divider style={{ margin: '30px 0' }} />
        <VendorListPage />
      </div>
    );
  } else {
    // If location state is undefined or null, do not render anything
    return null;
  }
}

export default AdminDashboard;
