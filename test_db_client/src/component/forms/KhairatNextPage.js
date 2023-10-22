import React, { useState } from "react";
// import { useState } from "react";
import DragDrop from "../functions/DragDrop"; // Import the DragAndDrop component

function KhairatNextPage() {
  const [deathCertFile, setDeathCertFile] = useState(null); // Maintain the selectedFile state
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [transportFareFile, setTransportFareFile] = useState(null); // Maintain the selectedFile state

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


          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default KhairatNextPage;
