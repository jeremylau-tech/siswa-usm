import React, { useState } from "react";
import './FoodApplication.css';
import DragDrop from "./functions/DragDrop"; // Import the DragAndDrop component

function FoodApplication() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Add state for the selected option

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setIsActive(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E',
    color: 'white',
  };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">Borang Permohonan<br />Makanan</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Maklumat Kupon Makanan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form class="form-style">
          <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Tajaan:</label>
            <div className="select-food-wrapper">
              <select id="options-food" name="options-food" className="select-food" onChange={handleOptionChange}>
                <option value="">Jenis Tajaan</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank Pelajar:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Dokumen Sokongan:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FoodApplication;
