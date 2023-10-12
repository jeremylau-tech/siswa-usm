import React from "react";
import ApplicationListPage from "./application/ApplicationListPage";
import AnalyticDashboard from "./AnalyticDashboard";
import Divider from '@mui/material/Divider';
import AnalyticGraph from "./AnalyticGraph";

function AdminDashboard() {
  return (
    <div className="App">
        <AnalyticDashboard />
        <Divider/>
        <AnalyticGraph />
        <Divider/>
        <ApplicationListPage />
    </div>
  );
}

export default AdminDashboard;
