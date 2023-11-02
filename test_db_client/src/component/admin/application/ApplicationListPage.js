import React from "react";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import KhairatKematianList from "./tables/KhairatKematianList";
import PerantiList from "./tables/PerantiList";
import KewanganList from "./tables/KewanganList";
import NewApplication from "./tables/NewApplication";
import PendingList from "./tables/PendingApplication";
import MakananList from "./tables/MakananList";
import { Button, Container } from "@mui/material";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useState } from "react";
import SettingsDialog from "./settings/SettingsDialog";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ApplicationListPage() {
  const [value, setValue] = React.useState(0);

  // State to control the visibility of the settings dialog
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  // Function to open the settings dialog
  const openSettingsDialog = () => {
    setSettingsDialogOpen(true);
  };

  // Function to close the settings dialog
  const closeSettingsDialog = () => {
    setSettingsDialogOpen(false);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container sx={{
      width: '100%',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      padding: '10px',
      height: '700px',
    }}>
      <div className="container mt-5">
        <div className="row">
          <div class="col">

          </div>
          <div class="col">
            <h2 className="status-title">Senarai Permohonan</h2>
          </div>
          <div class="col" style={{ textAlign: "left" }}>
            <Button
              variant="outlined"
              style={{
                borderColor: 'gray',
                color: 'white',
              }}
              onClick={openSettingsDialog} // Open the settings dialog when the button is clicked

            >
              <SettingsRoundedIcon
                style={{
                  color: "gray",
                }}
              ></SettingsRoundedIcon>
            </Button>
          </div>
        </div>
        <div class="row">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Permohonan Baharu" {...a11yProps(0)} />
              <Tab label="Keseluruhan " {...a11yProps(1)} />
              <Tab label="Khairat Kematian" {...a11yProps(2)} />
              <Tab label="Penyelenggaraan Peranti" {...a11yProps(3)} />
              <Tab label="Wang Ihsan" {...a11yProps(4)} />
              <Tab label="Makanan" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NewApplication />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PendingList />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <KhairatKematianList />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PerantiList />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <KewanganList />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MakananList />
            </Box>
          </CustomTabPanel>
        </div>
      </div>
      <SettingsDialog open={settingsDialogOpen} onClose={closeSettingsDialog} />
    </Container>


  );
}

export default ApplicationListPage;
