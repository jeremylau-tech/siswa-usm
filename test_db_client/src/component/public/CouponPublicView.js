import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { Container, Card, CardContent, Typography, Grid, Box, Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
function CouponPublicView() {

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

    const [filteredCoupons, setFilteredCoupons] = useState([...coupons]);
    const [selectedFilter, setSelectedFilter] = useState('Semua'); // Initial filter
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        // Sort coupons by dateUsed and timeUsed in descending order (latest first)
        const sortedCoupons = [...coupons].sort((a, b) => {
            // Convert date strings to a format suitable for creating Date objects
            const dateA = `${a.dateUsed.split('/')[2]}-${a.dateUsed.split('/')[1]}-${a.dateUsed.split('/')[0]}`;
            const dateB = `${b.dateUsed.split('/')[2]}-${b.dateUsed.split('/')[1]}-${b.dateUsed.split('/')[0]}`;

            const timeA = a.timeUsed.split(' ')[0];
            const periodA = a.timeUsed.split(' ')[1];
            const timeB = b.timeUsed.split(' ')[0];
            const periodB = b.timeUsed.split(' ')[1];

            // Compare dates
            const dateComparison = new Date(dateB) - new Date(dateA);

            if (dateComparison !== 0) {
                return dateComparison; // If dates are different, use date comparison
            } else {
                // If dates are the same, use time comparison
                if (periodA === 'AM' && periodB === 'PM') {
                    return -1; // A is earlier in the day (morning)
                } else if (periodA === 'PM' && periodB === 'AM') {
                    return 1; // B is earlier in the day (morning)
                } else {
                    return new Date(`2000-01-01T${timeB}`) - new Date(`2000-01-01T${timeA}`);
                }
            }
        });

        setCoupons(sortedCoupons);
        applyFilter(selectedFilter); // Apply the filter initially
    }, [coupons, selectedFilter]);

    const applyFilter = (filter) => {
        if (filter === 'Semua') {
            setFilteredCoupons([...coupons]);
        } else {
            const filtered = coupons.filter(coupon => coupon.name === filter);
            setFilteredCoupons(filtered);
        }
    };

    const handleFilterChange = (event) => {
        const newFilter = event;
        setSelectedFilter(newFilter);
        applyFilter(newFilter);
        setAnchorEl(null); // Close the dropdown menu after selecting a filter
    };

    const names = [...new Set(coupons.map(coupon => coupon.name))]; // Get unique names from coupons

    return (
        <div>
            <NavBar />
            <h1 className='status-title'>Senarai Kupon Diguna</h1>
            <Box
                sx={{
                    marginTop: '50px',
                }}
                align="center"
            >
                <Button
                    variant="contained"
                    size="small"
                    align="center"
                    style={{
                        marginBottom: '10px',
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        width: '300px',
                        height: '50px',
                        borderRadius: '10px',
                        outlineColor: '#CCCCCC',
                        outlineStyle: 'solid',
                        outlineWidth: '2px',
                        fontWeight: 'bold',
                        boxShadow: 'none',
                    }}
                    aria-controls="filter-menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    {selectedFilter}
                    <KeyboardArrowDownRoundedIcon

                        style={{
                            marginLeft: '5px',
                            align: 'right',
                        }}></KeyboardArrowDownRoundedIcon>
                </Button>

                <Menu
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
                </Menu>

                <Grid container spacing={2} padding={3} direction="column" xs={12} sm={6} md={3}>
                    {filteredCoupons.map((coupon, index) => (
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
                                            {coupon.id}
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {coupon.name} ({coupon.location})
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {coupon.timeUsed}
                                        </Typography>
                                    </Container>
                                    <Container>
                                        <Typography variant="body1" align="center" margin gutterBottom>
                                            {coupon.dateUsed}
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
