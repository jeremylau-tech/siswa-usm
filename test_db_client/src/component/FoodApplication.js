import React, { useState } from "react";
import './FoodApplication.css';
import DragDrop from "./functions/DragDrop"; // Import the DragAndDrop component

function FoodApplication() {
  const [icNumFile, setIcNumFile] = useState(null); // Maintain the selectedFile state
  const [bankStatementFile, setBankStatementFile] = useState(null); // Maintain the selectedFile state
  const [paymentSlipFile, setPaymentSlipFile] = useState(null); // Maintain the selectedFile state
  const [supportDocFile, setSupportDocFile] = useState(null); // Maintain the selectedFile state
  const [sponsorType, setSponsorType] = useState(""); // State for selected options

  const [formData, setFormData] = useState({
    requestor_id: "202124",
    request_type: "makanan"
  });

  const handleSponsorTypeChange = (e) => {
    setSponsorType(e.target.value);
};

const uploadFile = async (file) => {
  if (file) {
    try {
      
      const uploadData = new FormData();
      uploadData.append("file", file);
      

      const response = await fetch("http://localhost:8000/upload", {
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

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!sponsorType ||
    !icNumFile ||
    !bankStatementFile ||
    !paymentSlipFile ||
    !supportDocFile
    ) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Define the array of promises for file uploads
  const uploadPromises = [
    uploadFile(icNumFile, "ic_num_file"),
    uploadFile(bankStatementFile, "bank_statement_file"),
    uploadFile(paymentSlipFile, "payment_slip_file"),
    uploadFile(supportDocFile, "support_doc_file"),

  ];

  try {
    // Wait for all file upload promises to resolve
    const results = await Promise.all(uploadPromises);

    const formDataJSON = {
      ic_num_file: results[0],
      bank_statement_file: results[1],
      payment_slip_file: results[2],
      support_doc_file: results[3],
      requestor_id: formData.requestor_id,
      request_type: formData.request_type,
      sponsor_type: sponsorType
    };

    const apiUrl = "http://localhost:8000/insert-request"; // Update with your server's URL

    // Create a POST request to send the formData to the server
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataJSON),
    });

    if (response.ok) {
      // If the server responds with a 200 status code (OK), you can handle success here
      alert("Form data sent successfully!");
      
      setSponsorType("")
      setIcNumFile("");
      setBankStatementFile("");
      setPaymentSlipFile("");
      setSupportDocFile("");
    } else {
      console.log(formData);
      // Handle errors or display error messages here
      console.error("Form data submission failed.");
      alert("Something wrong on the backend!");
    }
  } catch (error) {
    console.error("Error during form submission:", error);
  }
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
        <h2 className="right-header">Maklumat Baucar Makanan</h2>
        <p className="right-header-para">Pastikan maklumat yang diisi tepat & sahih</p>
        <form className="form-style"  onSubmit={handleSubmit}>
          <div className="form-group select-food-container">
            <label htmlFor="options-food" className="select-food-label">Jenis Tajaan:</label>
            <div className="select-food-wrapper">
              <select id="sponsor_type" 
              name="sponsor_type" 
              className="select-food" 
              onChange={handleSponsorTypeChange}
              >
                <option value="">Jenis Tajaan</option>
                <option value="JPA">JPA</option>
                <option value="PTPTN">PTPTN</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Kad Pengenalan:</label>
            <DragDrop selectedFile={icNumFile} setSelectedFile={setIcNumFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Penyata Bank Pelajar:</label>
            <DragDrop selectedFile={bankStatementFile} setSelectedFile={setBankStatementFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <div className="form-group">
            <label htmlFor="email2">Salinan Slip Gaji Ibu Bapa:</label>
            <DragDrop selectedFile={paymentSlipFile} setSelectedFile={setPaymentSlipFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <div className="form-group">
            <label htmlFor="email2">Dokumen Sokongan:</label>
            <DragDrop selectedFile={supportDocFile} setSelectedFile={setSupportDocFile} /> {/* Pass selectedFile and setSelectedFile as props */}       
          </div>

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FoodApplication;
