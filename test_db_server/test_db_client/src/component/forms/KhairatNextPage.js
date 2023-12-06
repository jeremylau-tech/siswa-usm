import React, { useState, useEffect } from "react";
import DragDrop from "../functions/DragDrop";
import { Link } from "react-router-dom";

function KhairatNextPage() {
  const [deathCertFile, setDeathCertFile] = useState(null); // Maintain the selectedFile state
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [transportFareFile, setTransportFareFile] = useState(null); // Maintain the selectedFile state

  const [formData, setFormData] = useState({
    requestor_id: "202124",
    req_relationship: "",
    request_type: "khairat"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const uploadFile = async (file) => {
    if (file) {
      try {
        
        const uploadData = new FormData();
        uploadData.append("file", file);
        

        const response = await fetch("http://docker.usm.my:8090/upload", {
          method: "POST",
          body: uploadData,
        });
  
        if (response.ok) {
          const filename = await response.text();

          return filename;
  
        } else {
          // Handle any errors
          console.error("File upload failed.");
          alert("File upload failed.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred during file upload.");
      }
    }
  };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!formData.req_relationship ||
        !deathCertFile ||
        !icNumFile ||
        !bankStatementFile||
        !transportFareFile) {
        alert("Please fill in all the required fields.");
        return;
      }
    
      // Define the array of promises for file uploads
      const uploadPromises = [
        uploadFile(deathCertFile, "death_cert_file"),
        uploadFile(icNumFile, "ic_num_file"),
        uploadFile(bankStatementFile, "bank_statement_file"),
        uploadFile(transportFareFile, "transport_fare_file"),
      ];
    
      try {
        // Wait for all file upload promises to resolve
        const results = await Promise.all(uploadPromises);

        const formDataJSON = {
          death_cert_file: results[0],
          ic_num_file: results[1],
          bank_statement_file: results[2],
          transport_fare_file: results[3], 
          req_relationship: formData.req_relationship,
          requestor_id: formData.requestor_id,
          request_type: formData.request_type
        };

        const apiUrl = "http://docker.usm.my:8090/insert-request"; // Update with your server's URL
    
        // Create a POST request to send the formData to the server
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataJSON),
        });
    
        if (response.ok) {
          // If the server responds with a 200 status code (OK), you can handle success here
          alert("Form data sent successfully!");

          setFormData(() => {
            // Reset the form fields by clearing the formData state
            return {
              req_relationship: ""
            };
          }, () => {
            console.log(formData); // This will log the updated formData
          });
    
          setDeathCertFile(null);
          setIcNumFile(null);
          setBankStatementFile(null);
          setTransportFareFile(null);
        } else {
          console.log(formData);
          // Handle errors or display error messages here
          console.error("Form data submission failed.");
          alert("Something wrong on the backend!");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    };
    
    const buttonStyle = {
      padding: '10px 20px',
      borderRadius: '5px',
      marginRight: '10px',
      width: 'calc(48% - 5px)',
    };
    
    const kembaliButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#808080', // Lighter color for Kembali button
      borderColor: '#808080', // Matching border color
      color: 'white', // Text color for Kembali button
    };
    
    const hantarButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#491E6E',
      borderColor: '#491E6E',
      color: 'white',
    };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">Borang Permohonan<br />Bantuan Khairat <br />Kematian</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Butiran Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form class="form-style"  onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="relationship">Hubungan:</label>
            <input
              type="text"
              placeholder="Ibu/ Bapa/ Suami/ Isteri/ Penjaga Sah/ Nyatakan Lain-lain Berkenaan"
              id="req_relationship"
              name="req_relationship"
              value={formData.req_relationship}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email2">Salinan Sijil Kematian:</label>
            <DragDrop selectedFile={deathCertFile} setSelectedFile={setDeathCertFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank:</label>
            <DragDrop selectedFile={bankStatementFile} setSelectedFile={setBankStatementFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>


          <div className="form-group">
            <label htmlFor="email2">Salinan Resit Asal Tambang Perjalanan (Tujuan Pengebumian):</label>
            <DragDrop selectedFile={transportFareFile} setSelectedFile={setTransportFareFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>

          {/* Button container */}
          <div className="button-container">
            <Link to="/Khairat_FormPage">
              <button type="button" style={kembaliButtonStyle}>
                Kembali
              </button>
            </Link>
            <button type="submit" style={hantarButtonStyle}>
              Hantar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default KhairatNextPage;
