import React, { useState } from "react";
import './UploadPage.css';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Add state for selected option

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
      <div className="form-column left">
        <h2 className="left-header">Borang Permohonan<br />Bantuan Khairat<br />Kematian</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form>

          <div className="form-group">
            <label htmlFor="email2">Hubungan:</label>
            <input type="email" id="email2" name="email2" />
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
          <div className={`container-file-upload ${isActive ? "is-active" : ""}`}>
            <div
              className={`file-drop-area ${selectedFile ? "file-selected" : ""}`}
              onDrop={handleFileDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsActive(true);
              }}
              onDragLeave={() => setIsActive(false)}
            >
              <span className="fake-btn">Choose files</span>
              <span className="file-msg">or drop files here</span>
              <input
                className="file-input"
                type="file"
                multiple
                onChange={handleFileInputChange}
              />
              {selectedFile && (
                <div
                  className="item-delete"
                  onClick={() => setSelectedFile(null)}
                ></div>
              )}
            </div>
          </div>
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
