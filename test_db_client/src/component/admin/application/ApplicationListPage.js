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

function ApplicationListPage(user_roles) {
  const roles = user_roles.user_roles

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container mt-5">

        <h2 className="status-title">Senarai Permohonan</h2>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Permohonan Baharu" {...a11yProps(0)} />
          {/* <Tab label="Pengesahan " {...a11yProps(1)} /> */}
          <Tab label="Khairat Kematian" {...a11yProps(1)} />
          <Tab label="Penyelenggaraan Peranti" {...a11yProps(2)} />
          <Tab label="Wang Ihsan" {...a11yProps(3)} />
          <Tab label="Makanan" {...a11yProps(4)} />
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
          <NewApplication roles={roles}/>
        </Box>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PendingList />
        </Box>
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={1}>
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
      <CustomTabPanel value={value} index={2}>
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
      <CustomTabPanel value={value} index={3}>
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
      <CustomTabPanel value={value} index={4}>
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
    </Box>

    </div>
  );
}

export default ApplicationListPage;
