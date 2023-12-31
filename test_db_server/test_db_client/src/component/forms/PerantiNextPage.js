import React, { useState } from "react";
import DragDrop from "../functions/DragDrop";
import { Link } from "react-router-dom";

function PerantiNextPage() {
  const [paymentSlipFile, setPaymentSlipFile] = useState(null); // Maintain the selectedFile state
  const [deviceImageFile, setDeviceImageFile] = useState(null); // Maintain the selectedFile state
  const [sponsorType, setSponsorType] = useState(""); // State for selected options
  const [deviceType, setDeviceType] = useState(""); // State for the reason text area
  const [deviceDetails, setDeviceDetails] = useState(""); // State for the reason text area

  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const [customOption, setCustomOption] = useState(""); // State for custom "Jenis Tajaan"

  const handleSponsorTypeChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    if (selectedOption !== "Lain") {
      setCustomOption(""); // Clear custom "Jenis Tajaan" if another option is selected
    }
  };

  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
  };

  const [formData, setFormData] = useState({
    requestor_id: "202124",
    request_type: "peranti"
  });

  const handleDeviceTypeChange = (e) => {
    setDeviceType(e.target.value);
  };

  const handleDeviceDetailsChange = (e) => {
    setDeviceDetails(e.target.value);
  };

  const uploadFile = async (file) => {
    if (file) {
      try {
        
        const uploadData = new FormData();
        uploadData.append("file", file);
        

        const response = await fetch("https://kebajikansiswa.usm.my/api/upload", {
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

    if (!sponsorType ||
      !deviceType||
      !deviceDetails ||
      !paymentSlipFile ||
      !deviceImageFile) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Define the array of promises for file uploads
    const uploadPromises = [
      uploadFile(paymentSlipFile, "payment_slip_file"),
      uploadFile(deviceImageFile, "device_pic_file"),
    ];
  
    try {
      // Wait for all file upload promises to resolve
      const results = await Promise.all(uploadPromises);

      const formDataJSON = {
        payment_slip_file: results[0],
        device_pic_file: results[1],
        device_type: deviceType,
        device_details: deviceDetails,
        requestor_id: formData.requestor_id,
        request_type: formData.request_type,
        sponsor_type: sponsorType
      };

      const apiUrl = "https://kebajikansiswa.usm.my/api/insert-request"; // Update with your server's URL
  
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
        
        setSponsorType("")
        setDeviceType("");
        setDeviceDetails("");
        setPaymentSlipFile("");
        setDeviceImageFile("");
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
        <h2 className="left-header">
          Borang Permohonan<br />Bantuan Kerosakan<br />Peranti
        </h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Maklumat Status Kewangan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style"  onSubmit={handleSubmit}>

          <div className="form-group select-container-peranti">
            <label htmlFor="options" className="select-label">
              Jenis Tajaan:
            </label>
            <select id="sponsor_type" name="sponsor_type" className="select" onChange={handleSponsorTypeChange}>
              <option value="">Sila Pilih Jenis Tajaan</option>
              <option value="Option 1">PTPTN</option>
              <option value="Option 2">JPA</option>
              <option value="Option 3">KPM</option>
              <option value="Lain">Lain-lain</option>
            </select>
            {selectedOption === "Lain" && (
              <div className="form-group">
                <label htmlFor="customOption">Sila Nyatakan Jenis Tajaan Lain:</label>
                <input
                  type="text"
                  id="customOption"
                  name="customOption"
                  value={customOption}
                  onChange={handleCustomOptionChange}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>

          <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "5px" }}>Maklumat Peranti</h2>
          <p style={{ textAlign: "center"}}>Pastikan maklumat yang diisi tepat & sahih</p>
          
          <div className="form-group">
            <label htmlFor="deviceDetails">Maklumat Kerosakan Peranti:</label>
            <textarea
              id="device_details"
              name="device_details"
              value={deviceDetails}
              onChange={handleDeviceDetailsChange}
              className="reason-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="device_type">Jenama Peranti:</label>
            <input 
            type="text" 
            id="device_type" 
            name="device_type" 
            value={deviceType}
            onChange={handleDeviceTypeChange} 
            placeholder="Lenovo/ Acer/ HP/ Nyatakan Lain-lain Berkenaan" />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Gambar Peranti:</label>
            <DragDrop selectedFile={deviceImageFile} setSelectedFile={setDeviceImageFile} /> {/* Pass selectedFile and setSelectedFile as props */}          </div>

          {/* Button container */}
          <div className="button-container">
            <Link to="/Peranti_FormPage">
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

export default PerantiNextPage;
