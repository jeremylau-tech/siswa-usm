import React, { useState, useEffect } from 'react';
import "./AnalyticDashboard.css";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function AnalyticDashboard() {
  const [baharuCount, setBaharuCount] = useState(null);
  const [dalamProsesCount, setDalamProsesCount] = useState(null);
  const [lulusCount, setLulusCount] = useState(null);
  const [tolakCount, setTolakCount] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:8000/countByStatus'; // Update the URL to match your server route

    const statusData = [
      { status: 'baharu', stateSetter: setBaharuCount },
      { status: 'dalam proses', stateSetter: setDalamProsesCount },
      { status: 'lulus', stateSetter: setLulusCount },
      { status: 'tolak', stateSetter: setTolakCount },
      // Add more status categories as needed
    ];

    // Create an array of promises for each status category
    const requests = statusData.map(async ({ status }) => {
      const data = {
        table: 'request',
        status: status,
        req_type: 'all'
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
          throw new Error(`Failed to fetch ${status} count`);
        }
        const data_1 = await response.json();
        return data_1[0].count;
      } catch (err) {
        console.error(err);
        return null;
      }
    });

    // Execute all promises concurrently
    Promise.all(requests)
      .then((counts) => {
        // Update state for each status category
        statusData.forEach((item, index) => {
          const { stateSetter } = item;
          stateSetter(counts[index]);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    
    <div className="analyticDashboard pb pt pt-md">
      <Container maxWidth="xl">
        <h2 className="status-title">Dashboard BHEPA</h2>
        <br></br>
        <div className="analyticDashboard-body">
          <Grid container spacing={3}>
          <Grid item lg={3} xl={3}>
              <Card className="card card-lift--hover">
                <CardContent className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="row">
                        <div className="col-12">
                          <Typography variant="h6">Baharu</Typography>
                        </div>
                        <div className="col-12">
                          <Typography variant="h4">{baharuCount}</Typography> 
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-orange text-white rounded-circle shadow">
                        <MoreTimeIcon />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-success mr-2">
                          <ArrowUpwardIcon /> 3.48%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} xl={3}>
              <Card className="card card-lift--hover">
                <CardContent className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="row">
                        <div className="col-12">
                          <Typography variant="h6">Dalam Proses</Typography>
                        </div>
                        <div className="col-12">
                          <Typography variant="h4">{dalamProsesCount}</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-blue text-white rounded-circle shadow">
                        <PendingActionsIcon />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-warning mr-2">
                          <ArrowDownwardIcon /> 3.48%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} xl={3}>
              <Card className="card card-lift--hover">
                <CardContent className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="row">
                        <div className="col-12">
                          <Typography variant="h6">Lulus</Typography>
                        </div>
                        <div className="col-12">
                        <Typography variant="h4">{lulusCount}</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-green text-white rounded-circle shadow">
                        <DoneAllIcon />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-warning mr-2">
                        <ArrowDownwardIcon /> 1.10%
                        </span>{" "}
                        Sejak semalam
                      </Typography>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={3} xl={3}>
              <Card className="card card-lift--hover">
                <CardContent className="card-body">
                  <div className="row">
                    <div className="col-9">
                      <div className="row">
                        <div className="col-12">
                          <Typography variant="h6">Ditolak</Typography>
                        </div>
                        <div className="col-12">
                        <Typography variant="h4">{tolakCount}</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-red text-white rounded-circle shadow">
                        <ThumbDownOffAltIcon />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-success mr-2">
                          <ArrowUpwardIcon /> 12%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default AnalyticDashboard;
