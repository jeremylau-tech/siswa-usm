import React, { useState, useEffect } from 'react';
import { Container, Typography, } from "@mui/material";
import { Box, } from "@mui/material";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",

};

const boxStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
};
function ResultStepArchive({ adminId, bhepaId, tncId, adminRemark, bhepaRemark, tncRemark }) {
  const [adminName, setAdminName] = useState({});
  const [bhepaName, setBhepaName] = useState({});
  const [tncName, setTncName] = useState({});

  useEffect(() => {
    const fetchData = async (userId, setName) => {
      if (userId[0]) {
        console.log(userId)
        try {
          const response = await fetch('http://localhost:8000/api/get-user-name', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            throw new Error('Error fetching data from the server');
          }

          const data = await response.json();
          setName(data.user[0].name);
          console.log(data.user[0].name)
        } catch (error) {
          console.error('Error fetching data from the server:', error);
        }
      }
    };

    fetchData([adminId], setAdminName);
    fetchData([bhepaId], setBhepaName);
    fetchData([tncId], setTncName);
  }, [adminId, bhepaId, tncId]);

  const boxStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  };

  const renderContent = (label, value) => {
    return (
      <Box style={boxStyle}>
        <Typography textAlign="left" padding={1}><b>{label}:</b></Typography>
        <hr />
        <Typography textAlign="left" padding={1}>{value || '-'}</Typography>
      </Box>
    );
  };

  return (
    <Container>
      <Box>
        <h2>Semakan Catatan</h2>
      </Box>

      {adminId && renderContent(adminName + " (Admin)", adminRemark)}
      {bhepaId && renderContent(bhepaName + " (Bhepa)", bhepaRemark)}
      {tncId && renderContent(tncName + " (TNC)", tncRemark)}
    </Container>
  );
}


export default ResultStepArchive;
