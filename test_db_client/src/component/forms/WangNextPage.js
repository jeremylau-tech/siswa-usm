import React, { useState } from "react";
import "./WangNextPage.css";
import DragDrop from "../functions/DragDrop";

function WangNextPage() {
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFile, setPaymentSlipFile] = useState(null); // Maintain the selectedFile state
  const [supportDocFile, setSupportDocFile] = useState(null); // Maintain the selectedFile state

  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  const [customOption, setCustomOption] = useState(""); // State for custom "Jenis Tajaan"
  const [reason, setReason] = useState(""); // State for the reason text area
  
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    if (selectedOption !== "Lain") {
      setCustomOption(""); // Clear custom "Jenis Tajaan" if another option is selected
    }
  };

  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
  };

  const handleReasonChange = (e) => {
    const inputValue = e.target.value;
    const wordLimit = 250;
    const words = inputValue.split(/\s+/);

    if (words.length <= wordLimit) {
      setReason(inputValue);
    } else {
      const truncatedText = words.slice(0, wordLimit).join(" ");
      setReason(truncatedText);
    }
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
          Borang Permohonan<br />Wang Ihsan
        </h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Butiran Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style">
          <div className="form-group select-container-wang">
            <label htmlFor="options" className="select-label">
              Jenis Tajaan:
            </label>
            <select id="options" name="options" className="select" onChange={handleOptionChange}>
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

          <div className="form-group select-container-bantuan">
            <div className="form-group">
              <label htmlFor="options" className="select-label">
                <label>Jenis Bantuan Yang Diperlukan:</label>
              </label>
              <select
                id="bantuanOptions"
                name="bantuanOptions"
                className="select"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Sila Pilih Jenis Bantuan</option>
                <option value="yuranDesa">Yuran Desasiswa</option>
                <option value="yuranPengajian">Yuran Pengajian</option>
                <option value="saraHidup">Sara Hidup</option>
                <option value="masalahKesihatan">Masalah Kesihatan</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amaun Yang Diperlukan:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="RM"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Jelaskan Bantuan Yang Diperlukan (Maksimum 250 Patah Perkataan):</label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleReasonChange}
              className="reason-textarea"
              placeholder="Saya memerlukan bantuan ini kerana..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank Pelajar:</label>
            <DragDrop selectedFile={bankStatementFile} setSelectedFile={setBankStatementFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Dokumen Sokongan:</label>
            <DragDrop selectedFile={supportDocFile} setSelectedFile={setSupportDocFile} />
          </div>

          <button type="submit" style={buttonStyle}>
            Hantar
          </button>
        </form>
      </div>
    </div>
  );
}

export default WangNextPage;
