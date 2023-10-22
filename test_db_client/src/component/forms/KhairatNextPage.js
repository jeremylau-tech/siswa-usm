import React from "react";
// import { useState } from "react";
import DragDrop from "../functions/DragDrop"; // Import the DragAndDrop component

function KhairatNextPage() {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [isActive, setIsActive] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");

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

  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

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
        <h2 className="right-header">Maklumat Khairat Kematian</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form class="form-style">
          
          <div className="form-group">
            <label htmlFor="relationship">Hubungan:</label>
            <input type="text" id="relationship" name="relationship" placeholder="Ibu/ Ayah/ Adik-beradik" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email2">Salinan Sijil Kematian:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank:</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Resit Asal Tambang Perjalanan (Tujuan Pengebumian):</label>
            <DragDrop /> {/* Render the DragAndDrop component */}
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default KhairatNextPage;
