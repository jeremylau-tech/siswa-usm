import React, { useState } from "react";
import "./WangNextPage.css";
import DragDrop from "../functions/DragDrop";

function WangNextPage() {
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
        <h2 className="right-header">Maklumat Wang Ihsan</h2>
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
            <label>Jenis Bantuan Yang Diperlukan:</label>
            <div>
                <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    value="yuranDesa"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes("yuranDesa")}
                />
                Yuran Desa
                </label>
            </div>
            <div>
                <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    value="yuranPengajian"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes("yuranPengajian")}
                />
                Yuran Pengajian
                </label>
            </div>
            <div>
                <label className="checkbox-label">
                <input
                    type="checkbox"
                    className="checkbox-input"
                    value="saraHidup"
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes("saraHidup")}
                />
                Sara Hidup
                </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amaun Yang Diperlukan:</label>
            <input
                type="number"  // Change the input type to "number"
                id="amount"
                name="amount"
                placeholder="RM" // Set "RM" as a placeholder
                step="0.01" // Optionally specify step value for decimal numbers
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Jelaskan Bantuan Yang Diperlukan (Sekitar 50 Patah Perkataan):</label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              className="reason-textarea"
            />
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

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default WangNextPage;
