import React from "react";
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';
import AnalyticGraph from "./AnalyticGraph";
import VendorListPage from "./vendor/VendorListPage";

function AdminDashboard() {
  return (
    <div className="App">
        <AnalyticDashboard />
        <Divider/>
        <AnalyticGraph />
        <Divider/>
        <ApplicationListPage />
        <Divider/>
        <VendorListPage />
        
    </div>
  );
}

export default AdminDashboard;
