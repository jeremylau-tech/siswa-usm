import React from "react";
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';

function AdminDashboard() {
  return (
    <div className="App">
        <AnalyticDashboard />
        <Divider/>
        <ApplicationListPage />
    </div>
  );
}

export default AdminDashboard;
