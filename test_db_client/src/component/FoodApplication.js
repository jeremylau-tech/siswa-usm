import React, { useState } from "react";
import './FoodApplication.css';
import DragDrop from "./functions/DragDrop";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';

function FoodApplication() {
  const [sponsorType, setSponsorType] = useState(""); // State for selected options
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFile, setPaymentSlipFile] = useState(null); // Maintain the selectedFile state
  const [foodJustification, setFoodJustification] = useState(""); // State for justification text
  const [customOption, setCustomOption] = useState(""); // State for custom "Jenis Tajaan"
  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // alert(user.unique_id);
  // console.log(user);

  const [formData, setFormData] = useState({
    requestor_id: user.unique_id,
    request_type: "makanan"
  });

  const handleHome = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/LandingPage', { state: { ...user } });
  };

const handleSponsorTypeChange = (e) => {
  const selectedOption = e.target.value;
  setSponsorType(selectedOption);
  if (selectedOption === "Lain") {
    setCustomOption("");
  }
};

  const uploadFile = async (file, category) => {
    if (file) {
      try {
        
        const uploadData = new FormData();
        uploadData.append("file", file);
        const url = "http://docker.usm.my:8000/upload/" + category
        const response = await fetch(url, {
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

    if (!sponsorType || (sponsorType === "Lain" && !customOption) ||
      !icNumFile ||
      !paymentSlipFile ||
      !foodJustification) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Define the array of promises for file uploads
    const uploadPromises = [
      uploadFile(icNumFile, "ic"),
      uploadFile(paymentSlipFile, "paymentslip"),
    ];
  
    try {
      // Wait for all file upload promises to resolve
      const results = await Promise.all(uploadPromises);

      const formDataJSON = {
        ic_num_file: results[0],
        payment_slip_file: results[1],
        sponsor_type: sponsorType === "Lain" ? customOption : sponsorType,
        food_justification: foodJustification,
        requestor_id: formData.requestor_id,
        request_type: formData.request_type,
      };

      const apiUrl = "http://docker.usm.my:8000/insert-request"; // Update with your server's URL
      console.log(formDataJSON)


      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJSON),
      });
  
      if (response.ok) {
        // if (true) {

        // If the server responds with a 200 status code (OK), you can handle success here
        alert("Form data sent successfully!");
        
        setSponsorType("");
        setIcNumFile(null)
        setPaymentSlipFile(null);
        setFoodJustification("");
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
        <h2 className="left-header">Borang Permohonan<br />Kupon Makanan</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Butiran Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style"  onSubmit={handleSubmit}>
          
        <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Tajaan:</label>
            <p className="subtext">Choose the Sponsorship Type:</p>
            <div className="select-food-wrapper">
            <select id="sponsor_type" name="sponsor_type" className="select" onChange={handleSponsorTypeChange} value={sponsorType}>
                <option value="">Sila Pilih Jenis Tajaan</option>
                <option value="PTPTN">PTPTN</option>
                <option value="JPA">JPA</option>
                <option value="KPM">KPM</option>
                <option value="Lain">Lain-lain <span className="subtext">(Other Sponsorship Type)</span></option>
              </select>
            </div>
            {sponsorType.includes("Lain") && (
              <div className="form-group">
                <label htmlFor="customOption" className="customOptiontext">Sila Nyatakan Jenis Tajaan Lain:</label>
                <p className="subtext">Specify the Other Sponsorship Type</p>
                <input
                  type="text"
                  id="customOption"
                  name="customOption"
                  value={customOption}
                  onChange={(e) => setCustomOption(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <p className="subtext">Photocopy of Identity Card:</p>
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <p className="subtext">Copy of Parent's Salary Slip:</p>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          {/* Justification textarea */}
          <div className="form-group">
            <label htmlFor="justification">Justifikasi Untuk Menyokong Permohonan:</label>
            <p className="subtext">Provide a Brief Justification for the Application:</p>
            <textarea
              id="food_justification"
              name="food_justification"
              value={foodJustification}
              onChange={(e) => setFoodJustification(e.target.value)}
              className="reason-textarea"
              placeholder="Saya memerlukan bantuan ini kerana..."
            />
          </div>

          {/* Button container */}
          <div className="button-container">
              <button type="button" style={kembaliButtonStyle} onClick={
                handleHome()
              }>
                Kembali
              </button>
            <button type="submit" style={hantarButtonStyle} onClick={
                handleHome()
              }>
              Hantar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodApplication;