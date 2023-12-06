import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Container, Card, CardContent, Typography, Grid, Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useParams } from 'react-router-dom';

function CouponPublicView() {
        const { vendorId } = useParams();
        const [baucars, setBaucars] = useState([]); // Initialize with an empty array
        const [vendorData, setVendorData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
              try {
                const requestBody = {
                  vendorId: vendorId
                };
          
                const response = await fetch('http://docker.usm.my:8000/api/baucar-all-vendor', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(requestBody),
                });
          
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
          
                const data = await response.json();
          
                if (data.baucars) {
                //   console.log(data.baucars);
                  setBaucars(data.baucars);
                }
              } catch (error) {
                console.error('Error fetching coupons:', error);
                // Handle the error, e.g., inform the user or retry the request
              }
            };
          
            fetchData();
          }, [vendorId]);

          useEffect(() => {
            const fetchData = async () => {
              try {
                // Make a POST request to your server
                const response = await fetch('http://docker.usm.my:8000/api/get-vendor', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ vendorId }),
                });
        
                if (!response.ok) {
                  throw new Error('Failed to fetch vendor details');
                }
        
                // Parse the JSON response
                const data = await response.json();
        
                // Set the vendorData state with the fetched data
                setVendorData(data.vendors[0]);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };
        
            // Call the fetchData function when the component mounts or when vendorId changes
            fetchData();
          }, [vendorId]);

    const [coupons, setCoupons] = useState([
        {
            id: "#12314",
            name: "Cafeteria F",
            location: "Tekun",
            timeUsed: "10:00AM",
            dateUsed: "29/12/2023",
        },
        {
            id: "#12315",
            name: "Cafeteria B",
            location: "Aman Damai",
            timeUsed: "8:00AM",
            dateUsed: "30/12/2023",
        },
        {
            id: "#12313",
            name: "Cafeteria A",
            location: "Restu",
            timeUsed: "10:00AM",
            dateUsed: "30/12/2023",
        },
        {
            id: "#123141",
            name: "Cafeteria D",
            location: "Fajar",
            timeUsed: "10:00AM",
            dateUsed: "29/12/2023",
        },
        {
            id: "#123141",
            name: "Cafeteria D",
            location: "Fajar",
            timeUsed: "10:00AM",
            dateUsed: "29/12/2023",
        },

    ]);

    // const [filteredCoupons, setFilteredCoupons] = useState([...baucar]);
    const [selectedFilter, setSelectedFilter] = useState('Semua'); // Initial filter
    const [anchorEl, setAnchorEl] = useState(null);

    // useEffect(() => {
    //     // Sort coupons by dateUsed and timeUsed in descending order (latest first)
    //     const sortedCoupons = [...coupons].sort((a, b) => {
    //         // Convert date strings to a format suitable for creating Date objects
    //         const dateA = `${a.dateUsed.split('/')[2]}-${a.dateUsed.split('/')[1]}-${a.dateUsed.split('/')[0]}`;
    //         const dateB = `${b.dateUsed.split('/')[2]}-${b.dateUsed.split('/')[1]}-${b.dateUsed.split('/')[0]}`;

    //         const timeA = a.timeUsed.split(' ')[0];
    //         const periodA = a.timeUsed.split(' ')[1];
    //         const timeB = b.timeUsed.split(' ')[0];
    //         const periodB = b.timeUsed.split(' ')[1];

    //         // Compare dates
    //         const dateComparison = new Date(dateB) - new Date(dateA);

    //         if (dateComparison !== 0) {
    //             return dateComparison; // If dates are different, use date comparison
    //         } else {
    //             // If dates are the same, use time comparison
    //             if (periodA === 'AM' && periodB === 'PM') {
    //                 return -1; // A is earlier in the day (morning)
    //             } else if (periodA === 'PM' && periodB === 'AM') {
    //                 return 1; // B is earlier in the day (morning)
    //             } else {
    //                 return new Date(`2000-01-01T${timeB}`) - new Date(`2000-01-01T${timeA}`);
    //             }
    //         }
    //     });

    //     setCoupons(sortedCoupons);
    //     applyFilter(selectedFilter); // Apply the filter initially
    // }, [coupons, selectedFilter]);

    // const applyFilter = (filter) => {
    //     if (filter === 'Semua') {
    //         setFilteredCoupons([...coupons]);
    //     } else {
    //         const filtered = coupons.filter(coupon => coupon.name === filter);
    //         setFilteredCoupons(filtered);
    //     }
    // };

    // const handleFilterChange = (event) => {
    //     const newFilter = event;
    //     setSelectedFilter(newFilter);
    //     applyFilter(newFilter);
    //     setAnchorEl(null); // Close the dropdown menu after selecting a filter
    // };

    const names = [...new Set(coupons.map(coupon => coupon.name))]; // Get unique names from coupons

    // const formatTime = (timeString) => {
    //     const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    //     const formattedTime = new Date(timeString).toLocaleTimeString('en-US', options);
    //     return formattedTime;
    //   };

      function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        return `${formattedHours}:${minutes} ${period}`;
      }
      
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
      };

    return (
        <div>
            <NavBar />
            <h1 className='status-title'>Senarai Kupon Diguna</h1>
            <Box
                sx={{
                    marginTop: '5px',
                }}
                align="center"
            >
                <Grid container spacing={2} padding={3} direction="column" xs={12} sm={6} md={3}>
                     
                        <Grid item alignItems="center">
                            <Card
                                style={{
                                    outlineColor: '#CCCCCC',
                                    outlineStyle: 'solid',
                                    outlineWidth: '2px',
                                    borderRadius: '10px',
                                }}
                            >
                                <CardContent>
  {vendorData ? (
    <Typography variant="h6" align="center" padding={1} fontWeight="bold">
      {vendorData.vendor_name} ({vendorData.vendor_location})
    </Typography>
  ) : (
    <Typography variant="body2" align="center">
      Loading...
    </Typography>
  )}
</CardContent>
                            </Card>
                        </Grid>
                    
                </Grid>

                {/* <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem value="Semua" onClick={() => handleFilterChange('Semua')}>Semua</MenuItem>
                    {names.map((name, index) => (
                        <MenuItem key={index} value={name} onClick={() => handleFilterChange(name)}>
                            {name}
                        </MenuItem>
                    ))}
                </Menu> */}

                <Grid container spacing={2} padding={3} direction="column" xs={12} sm={6} md={3}>
                    {baucars.map((baucar, index) => (
                        <Grid item key={index} alignItems="center">
                            <Card
                                style={{
                                    outlineColor: '#CCCCCC',
                                    outlineStyle: 'solid',
                                    outlineWidth: '2px',
                                    borderRadius: '10px',
                                }}
                            >
                                <CardContent>
                                    <Container
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: '#CCCCCC',
                                            borderRadius: '5px',
                                            margin: '5px',
                                        }}
                                    >
                                        <Typography variant="h5" align="center" padding={1} fontWeight="bold">
                                            {baucar.baucar_code}
                                        </Typography>
                                    </Container>
                                    {/* <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {baucar.name} ({baucar.location})
                                        </Typography>
                                    </Container> */}
                                    <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {formatTime(baucar.baucar_redeem_time)}
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {formatDate(baucar.baucar_redeem_date)}
                                        </Typography>
                                    </Container>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div >
    );
}

export default CouponPublicView;
