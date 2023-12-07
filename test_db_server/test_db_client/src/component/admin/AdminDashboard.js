import React, { useEffect } from 'react';
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';
import AnalyticGraph from "./AnalyticGraph";
import VendorListPage from "./vendor/VendorListPage";
import { useNavigate, useLocation } from 'react-router-dom';

function AdminDashboard(props) {
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/WelcomePage');
    }
  }, [user, navigate]);

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
}

export default AdminDashboard;
