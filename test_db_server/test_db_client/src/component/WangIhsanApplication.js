import React, { useState } from "react";
import './FoodApplication.css';
import DragDrop from "./functions/DragDrop";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';

function FoodApplication() {
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFileFather, setPaymentSlipFileFather] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFileMother, setPaymentSlipFileMother] = useState(null); // Maintain the selectedFile state
  const [wangIhsanJustification, setWangIhsanJustification] = useState(""); // State for justification text
  const [ammountRequested, setAmmountRequested] = useState(0); // State for justification text
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [supportDocFile, setSupportDocFile] = useState(null); // Maintain the selectedFile state
  const [sponsorType, setSponsorType] = useState(""); // State for selected options
  const [helpType, setHelpType] = useState(""); // State for selected options
  const [customOption, setCustomOption] = useState(""); // State for custom "Jenis Tajaan"


  const location = useLocation();
  const user = location.state;
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [isSubmit, isSubmitSet] = useState(false);

  const handleHome = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/LandingPage', { state: { ...user } });
  };

  const [formData, setFormData] = useState({
    requestor_id: user.nokp,
    requestor_name: user.nama,
    request_type: "wang_ihsan"
  });

  const MAX_FILE_SIZE_MB = 1;

  const handleFileChange = (file, setFileState, category) => {
    // Check if the file is a PDF
    if (file && file.type !== "application/pdf") {
      alert("Please upload only PDF files.");
      return;
    }

    // Check if the file size is below 5MB
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    // Set the file state
    setFileState(file);

    // If the file is valid, upload it
    if (file) {
      uploadFile(file, category);
    }
  };

const handleSponsorTypeChange = (e) => {
  const selectedOption = e.target.value;
  setSponsorType(selectedOption);
  if (selectedOption === "Lain") {
    setCustomOption("");
  }
};

const handleHelpType = (e) => {
  const selectedOption = e.target.value;
  setHelpType(selectedOption);
};

  const uploadFile = async (file, category) => {
    if (file) {
      try {
        
        const uploadData = new FormData();
        uploadData.append("file", file);
        const url = "https://kebajikansiswa.usm.my/api/upload/" + category
        const response = await fetch(url, {
          method: "POST",
          body: uploadData,
        });
  
        if (response.ok) {
          const filename = await response.text();
          return filename;
  
        } else {
          // Handle any errors
          console.error("File upload failed.");
          alert("File upload failed.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred during file upload.");
      }
    }
  };

  const MAX_WORDS_IN_JUSTIFICATION = 250;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
    "Dengan ini saya mengesahkan bahawa semua maklumat yang telah saya isytihar ini adalah SAHIH, BENAR dan TERKINI serta di isytihar di atas persetujuan saya. Saya memahami dan bersetuju bahawa jika terdapat mana-mana maklumat yang dinyatakan adalah PALSU atau TIDAK BENAR , pihak Universiti Sains Malaysia berhak mengambil tindakan disiplin terhadap saya di samping tindakan pembatalan apa jua kemudahan yang telah atau akan diberikan kepada saya lanjutan daripada PEMALSUAN maklumat yang saya berikan.\n"+
    "-----------------------------------------------------\n"+
    "I hereby confirm that all the information declared is ORIGINAL, ACCURATE and UP TO DATE with my consent. I understand and agree that if there is any information that is FALSE or INCORRECT, Universiti Sains Malaysia reserves the right to take disciplinary action against me and withdraw any assistance that have been or will be given to me in relevance to the FALSE submission.")

    if (!isConfirmed)
    return

    if (!isSubmit) {
      // Update state to mark the button as clicked
      isSubmitSet(true);}

    if (
      !sponsorType ||
      (sponsorType === "Lain" && !customOption) ||
      !helpType ||
      !bankStatementFile || 
      !wangIhsanJustification || 
      !paymentSlipFileMother ||
      !paymentSlipFileFather ||
      !icNumFile ||
      !ammountRequested
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    
    // Count words in the justification
    const justificationWords = wangIhsanJustification.split(/\s+/).filter(Boolean).length;

    // Check if the justification exceeds the word limit
    if (justificationWords > MAX_WORDS_IN_JUSTIFICATION) {
      alert(`Justification cannot exceed ${MAX_WORDS_IN_JUSTIFICATION} words.`);
      return;
    }
  
    // Define the array of promises for file uploads
    const uploadPromises = [
      uploadFile(icNumFile, "ic"),
      uploadFile(paymentSlipFileFather, "paymentslip"),
      uploadFile(paymentSlipFileMother, "paymentslip"),
      uploadFile(bankStatementFile, "bankstatement"),
      uploadFile(supportDocFile, "supportdoc"),
    ];
  
    try {
      // Wait for all file upload promises to resolve
      const results = await Promise.all(uploadPromises);

      const formDataJSON = {
        ic_num_file: results[0],
        payment_slip_file_father: results[1],
        payment_slip_file_mother: results[2],
        bank_statement_file: results[3],
        support_document_file: results[4],
        wang_ihsan_justification: wangIhsanJustification,
        sponsor_type: sponsorType === "Lain" ? customOption : sponsorType,
        help_type: helpType,
        ammount_requested:  ammountRequested,

        requestor_id: formData.requestor_id,
        request_type: formData.request_type,
        requestor_name: formData.requestor_name
      };

      const apiUrl = "https://kebajikansiswa.usm.my/api/insert-request"; // Update with your server's URL
      // console.log(formDataJSON)


      alert("Updated!")
      console.log(formDataJSON);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJSON),
      });
  
      if (response.ok) {
        // if (true) {

        // If the server responds with a 200 status code (OK), you can handle success here
        alert("Form data sent successfully!");
        
        setIcNumFile(null)
        setPaymentSlipFileMother(null)
        setPaymentSlipFileFather(null)
        setBankStatementFile(null)
        setSupportDocFile(null)
        setSponsorType("");
        setHelpType("");
        setAmmountRequested(0)
        setWangIhsanJustification("");
        navigate('/LandingPage', { state: { ...user } });
      } else {
        // console.log(formData);
        // Handle errors or display error messages here
        console.error("Form data submission failed.");
        alert("Something wrong on the backend!");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
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
        <h2 className="left-header">Borang Permohonan<br /> Wang Ihsan </h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Butiran Permohonan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style"  onSubmit={handleSubmit}>

        <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Tajaan:</label>
            <p className="subtext">Choose the Sponsorship Type:</p>
            <div className="select-food-wrapper">
            <select id="sponsor_type" name="sponsor_type" className="select" onChange={handleSponsorTypeChange} value={sponsorType}>
                <option value="">Sila Pilih Jenis Tajaan</option>
                <option value="PTPTN">PTPTN</option>
                <option value="JPA">JPA</option>
                <option value="KPM">KPM</option>
                <option value="Lain">Lain-lain <span className="subtext">(Other Sponsorship Type)</span></option>
              </select>
            </div>
            {sponsorType.includes("Lain") && (
              <div className="form-group">
                <label htmlFor="customOption" className="customOptiontext">Sila Nyatakan Jenis Tajaan Lain:</label>
                <p className="subtext">Specify the Other Sponsorship Type</p>
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

          <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Bantuan:</label>
            <p className="subtext">Choose the Request Type:</p>
            <div className="select-food-wrapper">
            <select id="help_type" name="help_type" className="select" onChange={handleHelpType} value={helpType}>
                <option value="">Sila Pilih Jenis Bantuan</option>
                <option value="Yuran Desasiswa">Yuran Desasiswa</option>
                <option value="Yuran Kolej">Yuran Kolej</option>
                <option value="Sara Hidup">Sara Hidup</option>
                <option value="Masalah Kesihatan">Masalah Kesihatan</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ammountRequested">Jumlah permohonan bantuan:</label>
            <p className="subtext">Requested amount (RM):</p>
            <input
              type="number"
              id="ammount_requested"
              name="ammount_requested"
              value={ammountRequested}
              onChange={(e) => setAmmountRequested(e.target.value)}
              placeholder="0"
            />
          </div>


          <div className="form-group">
            <label htmlFor="">Salinan Kad Pengenalan (Saiz Fail Maksimum: 1MB):</label>
            <p className="subtext">Photocopy of Identity Card (Max File Size: 1MB):</p>
            <DragDrop
              selectedFile={icNumFile}
              setSelectedFile={(file) => handleFileChange(file, setIcNumFile, "ic")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Salinan Slip Gaji Bapa (Saiz Fail Maksimum: 1MB):</label>
            <p className="subtext">Copy of Parent's Salary Slip (Max File Size: 1MB):</p>
            <DragDrop
              selectedFile={paymentSlipFileFather}
              setSelectedFile={(file) => handleFileChange(file, setPaymentSlipFileFather, "paymentslip")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Salinan Slip Gaji Ibu (Saiz Fail Maksimum: 1MB):</label>
            <p className="subtext">Copy of Parent's Salary Slip (Max File Size: 1MB):</p>
            <DragDrop
              selectedFile={paymentSlipFileMother}
              setSelectedFile={(file) => handleFileChange(file, setPaymentSlipFileMother, "paymentslip")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Salinan Penyata Bank (Saiz Fail Maksimum: 1MB):</label>
            <p className="subtext">Copy of Bank Statement (Max File Size: 1MB):</p>
            <DragDrop
              selectedFile={bankStatementFile}
              setSelectedFile={(file) => handleFileChange(file, setBankStatementFile, "bankstatement")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Salinan dokumen sokongan (Saiz Fail Maksimum: 1MB):</label>
            <p className="subtext">Copy of Supporting Document (Max File Size: 1MB):</p>
            <DragDrop
              selectedFile={supportDocFile}
              setSelectedFile={(file) => handleFileChange(file, setSupportDocFile, "supportdoc")}
            />
          </div>


          {/* Justification textarea */}
          <div className="form-group">
            <label htmlFor="justification">Justifikasi Untuk Menyokong Permohonan (Maksimum 250 Patah Perkataan):</label>
            <p className="subtext">Provide a Brief Justification for the Application (Max 250 Words):</p>
            <textarea
              id="wang_ihsan_justification"
              name="wang_ihsan_justification"
              value={wangIhsanJustification}
              onChange={(e) => setWangIhsanJustification(e.target.value)}
              className="reason-textarea"
              placeholder="Saya memerlukan bantuan ini kerana..."
            />
          </div>

          {/* Button container */}
          <div className="button-container">
              <button type="button" style={kembaliButtonStyle} onClick={
                handleHome
              }>
                Kembali
              </button>
            <button type="submit" style={hantarButtonStyle}  disabled={isSubmit}>
              Hantar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodApplication;