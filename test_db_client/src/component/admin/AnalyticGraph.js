import React, { useState, useEffect } from 'react';
import { BarChart } from "@mui/x-charts/BarChart";
import "./AnalyticGraph.css";

export default function AnalyticGraph() {
  const [dataCounts, setDataCounts] = useState({});

  // Data for the chart
  const [data, setData] = useState([
    { group: "khairat", new: 0, pending: 0, completed: 0, rejected: 0 },
    { group: "makanan", new: 0, pending: 0, completed: 0, rejected: 0 },
    { group: "wang", new: 0, pending: 0, completed: 0, rejected: 0 },
    { group: "peranti", new: 0, pending: 0, completed: 0, rejected: 0 },
]);

  
useEffect(() => {
  const apiUrl = 'http://docker.usm.my:8000/countByStatus'; // Update the URL to match your server route

  const statusData = [
    { status: 'baharu', key: 'new' },
    { status: 'dalam proses', key: 'pending' },
    { status: 'lulus', key: 'completed' },
    { status: 'tolak', key: 'rejected' },
    // Add more status categories as needed
  ];

  // Create an array of promises for each status category within each group
  const requests = data.map(({ group }) => {
    return statusData.map(async ({ status, key }) => {
      const data = {
        table: 'request',
        status: status,
        req_type: group
      };

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ${status} count for group: ${group}`);
        }

        const responseData = await response.json();
        // console.log(group + "|" + status + ": " + responseData[0].count)
        return { group, key, count: responseData[0].count };
      } catch (err) {
        console.error(err);
        return null;
      }
    });
  });

  // Execute all promises concurrently
  Promise.all(requests.flat())
      .then((counts) => {
        const updatedData = [...data];
        let count_incr = 0
        let index = 0
        counts.forEach(({ group, key, count }) => {
          index = Math.floor(count_incr / 4);
          // console.log(key + ': ' + updatedData[index][key]);
          updatedData[index][key] = count;
          // console.log(updatedData[index].key);
          // console.log(updatedData[index].key)
          // updatedData[index].key = count;
          count_incr ++;
          // updatedData[group][key] = count;
          // console.log(group)
        });
  
        setData(updatedData);
        // console.log(updatedData)
      })
    .catch((err) => {
      console.error(err);
    });
}, []);

  // Prepare data for X-axis
  const xAxisData = [{ scaleType: "band", data: data.map((item) => item.group) }];

  // Prepare data for series
  const seriesData = [
    { data: data.map((item) => item.new), name: "New", color: "#ff9100" },
    { data: data.map((item) => item.pending), name: "Pending", color: "#16adf3" },
    { data: data.map((item) => item.completed), name: "Completed", color: "#51f830" },
    { data: data.map((item) => item.rejected), name: "Rejected", color: "#f5365c" },
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
          <div className="legend-label">Dalam Proses</div>
        </div>
        <div className="legend-item">
          <div className="legend-color completed-color"></div>
          <div className="legend-label">Lulus</div>
        </div>
        <div className="legend-item">
          <div className="legend-color rejected-color"></div>
          <div className="legend-label">Ditolak</div>
        </div>
      </div>
    </div>
  );
}
