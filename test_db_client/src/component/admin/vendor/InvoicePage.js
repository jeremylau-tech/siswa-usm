import React from "react";
import jsPDF from "jspdf";
import {
  Typography,
  Button,
  Box,
} from "@mui/material";
import { renderToString } from "react-dom/server";
import { useLocation, useNavigate } from "react-router-dom";

function InvoicePage({ selectedVendor }) {
  const location = useLocation();
  const row = location.state.row;
  let totalInvoice = row.couponUsed * 5;
  let date = new Date().toLocaleDateString();


  const handlePrint = () => {
    // const string = renderToString(<Prints />);
    // const pdf = new jsPDF("p", "mm", "a4");
    // pdf.fromHTML(string);
    // pdf.save(`Invoice_${selectedVendor.VendorName}.pdf`);
  };

  const Prints = () => (
    <div>
      <h1>Invoice for: {selectedVendor.VendorName}</h1>
      <p>ID Vendor: {selectedVendor.idVendor}</p>
      <p>Description: {selectedVendor.description}</p>
      <p>Owner: {selectedVendor.owner}</p>
      <p>Phone No: {selectedVendor.phoneNo}</p>
      <p>Email: {selectedVendor.email}</p>
      <p>Registration Date: {selectedVendor.registrationDate}</p>

      <h2>Products:</h2>
      <ul>
        <li>Product A: 2 units x $50.00</li>
        <li>Product B: 3 units x $30.00</li>
      </ul>

      <p>Total: $190.00</p>
    </div>
  );

  return (
    <div>
      <div className="invoice-box" style={styles.invoiceBox}>
        <table cellPadding="0" cellSpacing="0" style={styles.table}>
          <tr className="top" style={styles.topTableTd}>
            <td colSpan="2" style={styles.topTableTd}>
              <table style={styles.table}>
                <tr>
                  <td className="title" style={{ ...styles.title, textAlign: 'left' }}>
                    <img
                      src={row.logoUrl}
                      alt="Logo"
                      style={{ ...styles.title, maxWidth: '300px' }} // Adjust the max width as needed
                    />
                  </td>
                  <td style={{ ...styles.topTableTd, textAlign: 'right' }}>
                    Invoice Reference: {row.id}{row.idVendor}{date} <br />
                    Created: {date} <br />
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
                    {row.owner} <br />
                    {row.VendorName} <br />
                    {row.location}<br />
                    Phone: {row.phoneNo}<br />
                    Emel: {row.email}<br />
                  </td>
                  <td style={styles.tableTd}>
                    Bahagian Hal Ehwal Pembangunan Pelajar & Alumni <br />
                    Kompleks Cahaya, Bangunan H20-24,<br />
                    11800 Universiti Sains Malaysia, Pulau Pinang<br />
                    +604-653 3106/3107   +604-657 7053<br />
                    Emel : bhepa@usm.my
                  </td>
                </tr>
              </table>
            </td>
          </tr>


          <tr className="heading" style={styles.headingTd}>
            <td>Item</td>
            <td>Price</td>
          </tr>
          <tr className="item" style={styles.itemTd}>
            <td>Menu Rahmah * {row.couponUsed} set</td>
            <td>RM {totalInvoice}</td>
          </tr>
          <tr className="total" style={styles.totalTd}>
            <td></td>
            <td>Total: RM {totalInvoice}</td>
          </tr>
          <br />
          <tr className="heading" style={styles.headingTd}>
            <td>Payment Details </td>

            <td>Payment Method</td>
          </tr>
          <tr className="details" style={styles.detailsTd}>
            <td>
              Bank Name: {row.bank} <br />
              Account Holder Name: {row.accountName}<br />
              Account Number: {row.accountNo} <br />
            </td>
            <td>Bank Transfer</td>
          </tr>
        </table>
      </div>
      <Button
        style={{
          backgroundColor: 'grey',
          color: 'white',
          marginTop: '20px',
        }}
        variant="contained" onClick={handlePrint}>
        Print
      </Button>
    </div>
  );
}

const styles = {
  invoiceBox: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '30px',
    border: '1px solid #eee',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
    color: '#555',
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
  detailsTd: {
    paddingBottom: '20px',
  },
  itemTd: {
    borderBottom: '1px solid #eee',
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
