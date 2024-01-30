import React, { useState } from "react";
import "./WangNextPage.css";
import DragDrop from "../functions/DragDrop";
import { Link } from "react-router-dom";

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
              Sponsorship Type:
            </label>
            <p className="subtext">Photocopy of Identity Card:</p>
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
                <p className="subtext">Kinds of Help Needed:</p>
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
            <p className="subtext">Amount Required:</p>
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
            <p className="subtext">Explain the Help Needed (Maximum 250 Words):</p>
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
            <p className="subtext">Photocopy of Identity Card:</p>
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank Pelajar (3 Bulan Terkini):</label>
            <p className="subtext">Copy of Student Bank Statement (Last 3 Months):</p>
            <DragDrop selectedFile={bankStatementFile} setSelectedFile={setBankStatementFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu:</label>
            <p className="subtext">Copy of Mother's Salary Slip:</p>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Bapa:</label>
            <p className="subtext">Copy of Father's Salary Slip:</p>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} />
          </div>

          <div className="form-group">
            <label htmlFor="email2">Dokumen Sokongan (Jika Berkenaan):</label>
            <p className="subtext">Supporting Documents (If Applicable):</p>
            <DragDrop selectedFile={supportDocFile} setSelectedFile={setSupportDocFile} />
          </div>

          {/* Button container */}
          <div className="button-container">
            <Link to="/Wang_FormPage">
              <button type="button" style={kembaliButtonStyle}>
                Kembali
              </button>
            </Link>
            <button type="submit" style={hantarButtonStyle}>
              Hantar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default WangNextPage;
