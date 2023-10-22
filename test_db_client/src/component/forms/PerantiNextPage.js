import React, { useState } from "react";
import DragDrop from "../functions/DragDrop";

function PerantiNextPage() {
  const [, setSelectedFile] = useState(null);
  const [, setIsActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // State for selected options
  const [reason, setReason] = useState(""); // State for the reason text area

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
    setSelectedOptions([e.target.value]);
  };

  const handleCheckboxChange = (e) => {
    const option = e.target.value;
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const buttonStyle = {
    backgroundColor: "#491E6E",
    borderColor: "#491E6E",
    color: "white",
  };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">
          Borang Permohonan<br />Bantuan Khairat<br />Kematian
        </h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Maklumat Status Kewangan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style">
          
          <div className="form-group select-container-wang">
            <label htmlFor="options" className="select-label">
              Jenis Tajaan:
            </label>
            <select id="options" name="options" className="select" onChange={handleOptionChange}>
              <option value="">Jenis Tajaan</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "5px" }}>Maklumat Peranti</h2>
          <p style={{ textAlign: "center"}}>Pastikan maklumat yang diisi tepat & sahih</p>
          
          <div className="form-group">
            <label htmlFor="reason">Maklumat Kerosakan Peranti:</label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              className="reason-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="relationship">Jenama Peranti:</label>
            <input type="text" id="relationship" name="relationship" placeholder="Lenove/ Acer/ HP/ etc" />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Gambar Peranti:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PerantiNextPage;
