import React, { useState } from "react";
import './UploadPage.css';
import DragDrop from "./functions/DragDrop"; // Import the DragAndDrop component

function UploadPage() {
  // const [, setSelectedFile] = useState(null);
  // const [, setIsActive] = useState(false);
  const [, setSelectedOption] = useState(""); // Add state for the selected option

  // const handleFileDrop = (e) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setIsActive(false);
  //   }
  // };

  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //   }
  // };

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
        <h2 className="left-header">Borang Permohonan<br />Bantuan Khairat<br />Kematian</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form class="form-style">
          <div className="form-group">
            <label htmlFor="relationship">Hubungan:</label>
            <input type="text" id="relationship" name="relationship" />
          </div>
          <div className="form-group select-container">
            <label htmlFor="options" className="select-label">Jenis Tajaan:</label>
            <select id="options" name="options" className="select" onChange={handleOptionChange}>
              <option value="">Jenis Tajaan</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
