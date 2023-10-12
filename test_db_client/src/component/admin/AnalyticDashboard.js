import React from "react";
import "./AnalyticDashboard.css";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import MoreTimeIcon from '@mui/icons-material/MoreTime';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function AnalyticDashboard() {
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
                          <Typography variant="h4">597</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-red text-white rounded-circle shadow">
                        <MoreTimeIcon />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-success mr-2">
                          <ArrowUpwardIcon /> 3.48%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div>
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
                          <Typography variant="h6">Telah Disemak</Typography>
                        </div>
                        <div className="col-12">
                          <Typography variant="h4">1,056</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-green text-white rounded-circle shadow">
                        <PendingActionsIcon />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-warning mr-2">
                          <ArrowDownwardIcon /> 3.48%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div>
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
                          <Typography variant="h6">Selesai</Typography>
                        </div>
                        <div className="col-12">
                          <Typography variant="h4">924</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-orange text-white rounded-circle shadow">
                        <DoneAllIcon />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-warning mr-2">
                        <ArrowDownwardIcon /> 1.10%
                        </span>{" "}
                        Sejak semalam
                      </Typography>
                    </div>
                  </div>
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
                          <Typography variant="h4">496</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 text-right">
                      <div className="icon bg-blue text-white rounded-circle shadow">
                        <ThumbDownOffAltIcon />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" color="textSecondary">
                        <span className="text-success mr-2">
                          <ArrowUpwardIcon /> 12%
                        </span>{" "}
                        Sejak bulan lepas
                      </Typography>
                    </div>
                  </div>
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
