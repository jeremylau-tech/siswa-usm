import React from 'react';
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';
import AnalyticGraph from "./AnalyticGraph";
import VendorListPage from "./vendor/VendorListPage";
import { useNavigate, useLocation } from 'react-router-dom';

function AdminDashboard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;

  alert(user.roles)

  return (
    <div className="App">
        <AnalyticDashboard /> 
        <Divider/>
        <AnalyticGraph />
        <Divider/>
        <ApplicationListPage user_roles={user.roles}/>
        <Divider/>
        <VendorListPage />
    </div>
  );
}

export default AdminDashboard;
