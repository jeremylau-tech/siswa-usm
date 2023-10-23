import React, { useState } from "react";
// import { useState } from "react";
import './FoodApplication.css';
import DragDrop from "./functions/DragDrop"; // Import the DragAndDrop component

function FoodApplication() {
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFile, setPaymentSlipFile] = useState(null); // Maintain the selectedFile state
  const [supportDocFile, setSupportDocFile] = useState(null); // Maintain the selectedFile state
  const [justification, setJustification] = useState(""); // State for justification text

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customOption, setCustomOption] = useState(""); // State for custom "Jenis Tajaan"

  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E',
    color: 'white',
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOptions([selectedOption]);
    if (selectedOption !== "Lain") {
      setCustomOption(""); // Clear custom "Jenis Tajaan" if another option is selected
    }
  };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">Borang Permohonan<br />Makanan</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Maklumat Baucar Makanan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form class="form-style">
          
        <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Tajaan:</label>
            <div className="select-food-wrapper">
              <select id="options-food" 
              name="options-food" 
              className="select-food"
              onChange={handleOptionChange}
              >
                <option value="">Jenis Tajaan</option>
                <option value="Option 1">PTPTN</option>
                <option value="Option 2">JPA</option>
                <option value="Option 3">KPM</option>
                <option value="Lain">Lain-lain</option>
              </select>
            </div>
            {selectedOptions.includes("Lain") && (
              <div className="form-group">
                <label htmlFor="customOption">Sila Nyatakan Jenis Tajaan Lain:</label>
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
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          {/* Justification textarea */}
          <div className="form-group">
            <label htmlFor="justification">Justifikasi Untuk Menyokong Permohonan:</label>
            <textarea
              id="justification"
              name="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="reason-textarea"
              placeholder="Saya memerlukan bantuan ini kerana..."
            />
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FoodApplication;
