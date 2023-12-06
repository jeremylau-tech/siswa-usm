import React, { useState,useEffect } from "react";
import {
    Button, Typography,
} from "@mui/material";
import { renderToString } from "react-dom/server";
import { useLocation, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';


function UsedCouponList({ }) {
    const location = useLocation();
    const row = location.state.row;
    const [baucarMap, setBaucarmap] = useState({});

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toISOString().split('T')[0];
    };

    // alert(row.invoice_id)

    const columns = [
        {
            field: "baucar_code",
            headerName: "Kod Baucar",
            width: 150,
            editable: false, 
        },

        {
            field: "name",
            headerName: "Nama Pelajar",
            width: 100,
            editable: false,
        },
        {
            field: "unique_id",
            headerName: "No Matrik",
            width: 100,
            editable: false,
        },
        {
            field: "baucar_redeem_date",
            headerName: "Tarikh Digunakan",
            width: 150,
            editable: false,
            renderCell: (params) => {
                return <div>{formatDate(params.value)}</div>;
            },
        },
        {
            field: "vendor_name",
            headerName: "Nama Vendor",
            width: 150,
            editable: false,
        },
        {
            field: "vendor_location",
            headerName: "Lokasi Vendor",
            width: 150,
            editable: false,
        }
    ];

    // const rows = [
    //     { id_kupon: 1, student_name: "John Doe", matric_no: "M12345", coupun_used_date: "2023-11-01" },
    //     { id_kupon: 2, student_name: "Jane Smith", matric_no: "M67890", coupun_used_date: "2023-11-02" },
    //     { id_kupon: 3, student_name: "Bob Johnson", matric_no: "M11111", coupun_used_date: "2023-11-03" },
    //     { id_kupon: 4, student_name: "Alice Williams", matric_no: "M99999", coupun_used_date: "2023-11-04" },
    //     { id_kupon: 5, student_name: "Charlie Brown", matric_no: "M77777", coupun_used_date: "2023-11-05" },
    // ];

    const downloadDataAsCSV = () => {
        // Create a header row with column names
        const header = 'No Kupon,Nama Pelajar,No Matrik,Tarikh Digunakan';

        // Create a CSV content string by combining the header and data
        const csvData = [header].concat(
            rows.map((rows) =>
                `${rows.id_kupon},${rows.student_name},${rows.matric_no},${rows.coupun_used_date}`
            )
        ).join('\n');

        // Create a Blob with the CSV content
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

        // Use a library like FileSaver.js or implement the saveAs function
        // to trigger the download. Here's how you can use FileSaver.js:
        saveAs(blob, 'data.csv');
    };

    const getRowId = (row) => row.baucar_code;

    useEffect(() => {
        const invoiceId = row.invoice_id;  // Replace with the actual vendorId
    
        // Make an HTTP POST request to the /invoice-all-vendor endpoint
        fetch('https://kebajikansiswa.usm.my/api/invoice-baucar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invoiceId }),
        })
          .then(res => res.json())
          .then(data => {
            // Update the state with the retrieved data
            setBaucarmap(data.invoices);
            console.log(data.invoices)
          })
          .catch(error => {
            console.error('Error fetching data from the server:', error);
          });
      }, []);


    return (
        <div style={{ textAlign: "center" }}>
            <Box sx={{ height: 400, width: "80%", margin: "auto", marginTop: '100px' }}>
                <h2 className="status-title">Senarai Kupon untuk invois {row.invoice_id} {row.vendor_name}</h2>

                <Box sx={{ flexGrow: 1, }}
                    margin={1}
                    align={"right"}
                >

                    <Button variant="contained"
                        style={{
                            color: "#424242",
                            textTransform: "none",
                            backgroundColor: "#eeeeee",
                            boxShadow: "none",
                        }
                        }
                        onClick={downloadDataAsCSV}>
                        Muat Turun
                        <DownloadRoundedIcon
                            sx={{ ml: 1 }}
                        />
                    </Button>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontStyle={"italic"}
                        fontSize={12}
                    >  format .CSV </Typography>
                </Box>
                <Box sx={{
                    height: 400, width: "80",
                }}>
                    <DataGrid rows={baucarMap} columns={columns} pageSize={5} checkboxSelection getRowId={getRowId} />
                </Box>
            </Box>
        </div>
    );
}


export default UsedCouponList;