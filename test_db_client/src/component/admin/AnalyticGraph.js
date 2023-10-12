import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./AnalyticGraph.css";

export default function AnalyticGraph() {
  // Data for the chart
  const data = [
    { group: "Khairat Kematian", new: 200, pending: 190, completed: 312, rejected: 104 },
    { group: "Makanan", new: 101, pending: 211, completed: 100, rejected: 80 },
    { group: "Wang Ihsan", new: 327, pending: 90, completed: 105, rejected: 99 },
    { group: "Peranti", new: 291, pending: 252, completed: 119, rejected: 101 },
  ];

  // Prepare data for X-axis
  const xAxisData = [{ scaleType: "band", data: data.map((item) => item.group) }];

  // Prepare data for series
  const seriesData = [
    { data: data.map((item) => item.new), name: "New", color: "#f5365c" },
    { data: data.map((item) => item.pending), name: "Pending", color: "#51f830" },
    { data: data.map((item) => item.completed), name: "Completed", color: "#ff9100" },
    { data: data.map((item) => item.rejected), name: "Rejected", color: "#16adf3" },
  ];

  return (
    <div className="chart-container">
      {/* Bar Chart */}
      <BarChart xAxis={xAxisData} series={seriesData} width={1000} height={350} />

      {/* Legend */}
      <div className="legend">
        {/* Legend items */}
        <div className="legend-item">
          <div className="legend-color new-color"></div>
          <div className="legend-label">Baharu</div>
        </div>
        <div className="legend-item">
          <div className="legend-color pending-color"></div>
          <div className="legend-label">Telah Disemak</div>
        </div>
        <div className="legend-item">
          <div className="legend-color completed-color"></div>
          <div className="legend-label">Selesai</div>
        </div>
        <div className="legend-item">
          <div className="legend-color rejected-color"></div>
          <div className="legend-label">Ditolak</div>
        </div>
      </div>
    </div>
  );
}
