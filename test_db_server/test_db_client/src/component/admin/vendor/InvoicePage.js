import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";




function InvoicePage({ }) {
  const location = useLocation();
  const row = location.state.row;
  const navigate = useNavigate();
  const user = location.state;
  const data = { userId: user.unique_id };
  let totalInvoice = row.baucarToClaim * 3.5;
  let date = new Date().toLocaleDateString();
  let invoiceId = generateRandomId(8);


  //Temporary user Id and userRole - User who process the coupon claim
  let userId = "USM0001";
  let userRole = "BHEPA"

  const [openPrintConfirmation, setOpenPrintConfirmation] = useState(false);

  const handlePrint = () => {
    setOpenPrintConfirmation(true);
  };

  const handleClosePrintConfirmation = () => {
    setOpenPrintConfirmation(false);
  };

  const handleConfirmPrint = () => {
    setOpenPrintConfirmation(false);

    const requestData = {
      vendorId: row.vendor_id,
      numClaimed: row.baucarToClaim
    };

    fetch("https://kebajikansiswa.usm.my/api/coupons-claimed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response data as needed
        alert(data.message); // You can show a message from the server response
      })
      .catch((error) => {
        console.error("Error in claim:", error);
      });

    // Create a new window or iframe
    const printWindow = window.open("", "_blank");
    // Append the content to the new window or iframe
    printWindow.document.write(document.getElementById('printablediv').innerHTML);
    // Close the document to ensure proper cleanup
    printWindow.document.close();

    // Print the content
    printWindow.print();

    // Close the new window or iframe
    printWindow.close();

    // Continue with other actions
    navigate('/AdminDashboard', { state: { ...location.state, ...data } });
  };


  //Temp user Id and userRole - User who process the coupon claim

  function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }


  return (
    <div>
      <div id="printablediv"
        style={{
          padding: '30px',
        }}>
        <div className="invoice-box" style={styles.invoiceBox}>
          <table cellPadding="0" cellSpacing="0" style={styles.table}>
            <tr className="top" style={styles.topTableTd}>
              <td colSpan="2" style={styles.topTableTd}>
                <table style={styles.table}>
                  <Typography variant="h6" fontWeight='bold' marginLeft={1} >INVOIS MEMBEKAL MAKANAN DAN MINUMAN</Typography>
                  <tr>
                    <td className="title" style={{ ...styles.title, textAlign: 'left' }}>

                    </td>
                    <td style={{ ...styles.topTableTd, textAlign: 'right' }}>
                      No Rujukan Invois: {invoiceId} <br />
                      Tarikh Invois: {date} <br />
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr className="information" style={styles.informationTableTd}>
              <td colSpan="2" style={styles.informationTableTd}>
                <table style={styles.table}>
                  <tr>
                    <td style={styles.tableTd}>
                      <Typography variant="" fontWeight='bold' >
                        Kepada:</Typography> <br />                      Bahagian Hal Ehwal Pembangunan Pelajar & Alumni <br />
                      Kompleks Cahaya, Bangunan H20-24,<br />
                      11800 Universiti Sains Malaysia, Pulau Pinang<br />
                      +604-653 3106/3107   +604-657 7053<br />
                      Emel : bhepa@usm.my
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableTd}>
                      <Typography variant="" fontWeight='bold' >
                        Daripada:</Typography> <br />
                      {row.vendor_fullname} <br />
                      {row.vendor_location}<br />
                      Phone: {row.vendor_phone}<br />
                      Emel: {row.vendor_email}<br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <table
              style={styles.itemTable}
            >
              <tr className="heading" style={styles.headingTd2}>
                <td>Perkara</td>
                <td>Harga</td>
              </tr>
              <tr className="item" style={styles.itemTd2}>
                <td>Menu Rahmah * {row.baucarToClaim} set</td>
                <td>RM {totalInvoice}</td>
              </tr>
              <tr className="total" style={styles.totalTd}>
                <td></td>
                <td>Jumlah: RM {totalInvoice}</td>
              </tr>
            </table>
            <br />
            <br />
            <br />
            <br />
            <Typography variant='bodytext' fontWeight=''> Bayaran perlulah dikreditkan kepada akaun seperti dalam butiran berikut,</Typography> <br />
            <Typography variant='h7' fontWeight='bold'> Butiran Pembayaran</Typography> <br />
            <tr className="details" style={styles.detailsTd}>
              <td>
                Nama Bank : {row.vendor_bank} <br />
                Nama Pemegang Akaun Bank: {row.vendor_bank_acc_name}<br />
                Nombor Akaun: {row.vendor_bank_acc} <br />
              </td>
            </tr>
            <br />
            <Typography variant='h7' fontWeight='bold'> Kaedah Pembayaran</Typography> <br />
            <tr>
              <td>Bank Transfer</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            className="col"
            variant="outlined"
            style={{
              backgroundColor: "#c8e6c9",
              color: "#33691e",
              marginTop: "20px",
              marginRight: "20px",
              marginBottom: "20px",
              outlineColor: "#33691e",
            }}
            onClick={handlePrint}
          >
            Teruskan Tuntutan Dan Cetak
          </Button>

          <Button
            className="col"
            style={{
              backgroundColor: "grey",
              color: "white",
              marginTop: "20px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
            variant="contained"
            onClick={() => {
              navigate('/AdminDashboard', { state: { ...location.state, ...data } });
            }}
          >
            Kembali
          </Button>
        </Container>
        {/* Print Confirmation Dialog */}
        <Dialog
          open={openPrintConfirmation}
          onClose={handleClosePrintConfirmation}
        >
          <DialogTitle id="alert-dialog-title">
            {"Teruskan Tuntutan?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "red" }}
            >
              Dengan menekan butang teruskan,
              <ul>
                <li> Bilangan kupon untuk dituntut akan dikira 0 semula. Rekod invois lama akan disediakan dalam butang 'Rekod' pada paparan senarai.</li>
                <li> Maklumat pada invois adalah tetap tidak boleh ditukar.</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ m: 1 }} style={{ backgroundColor: "#c8e6c9", color: "#33691e", fontWeight: "800" }} variant="contained" disableElevation size="large" onClick={handleConfirmPrint}>
              Teruskan Tuntutan</Button>
            <Button sx={{ m: 1 }} style={{ color: "grey" }} onClick={handleClosePrintConfirmation}
              size="large"> Kembali</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >
  );
}

const styles = {
  invoiceBox: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '30px',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
    color: '#555',
  },
  itemTable: {
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'left',
    border: '1px solid #000',

  },
  table: {
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'left',
  },
  tableTd: {
    padding: '5px',
    verticalAlign: 'top',
  },
  tableTdRight: {
    textAlign: 'right',
  },
  topTableTd: {
    paddingBottom: '20px',
  },
  title: {
    fontSize: '45px',
    lineHeight: '45px',
    color: '#333',

  },
  informationTableTd: {
    paddingBottom: '40px',
  },
  headingTd: {
    background: '#eee',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
  },
  headingTd2: {
    background: '#eee',
    border: '1px solid #000',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
  },
  detailsTd: {
    paddingBottom: '20px',
  },
  itemTd: {
    borderBottom: '1px solid #eee',
  },
  itemTd2: {
    borderBottom: '1px solid #000',
  },
  lastItemTd: {
    borderBottom: 'none',
  },
  totalTd: {
    borderBottomTop: '2px solid #eee',
    fontWeight: 'bold',
  },
};

export default InvoicePage;
