import React, { useState, useRef } from "react";
import "./DragDrop.css";

function DragDrop({ selectedFile, setSelectedFile }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!selectedFile) {
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    if (!selectedFile) {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the input field
    }
  };

  /*const uploadFile = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://docker.usm.my:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // File was uploaded successfully
          console.log("File uploaded successfully.");
          alert("File uploaded successfully.");
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
  };*/

  const boxStyle = {
    width: "100%",
    height: "150px",
    border: isDragging ? "2px solid green" : selectedFile ? "2px solid green" : "2px dashed gray",
    backgroundColor: isDragging ? "lightgreen" : selectedFile ? "lightgreen" : "lightgray",
    display: "flex",
    flexDirection: "column", // Display children vertically
    alignItems: "center",
    justifyContent: "center",
  };

  const buttonStyle = {
    marginTop: "10px", // Add some space between the text and the button
  };

  const textStyles = {
    fontWeight: "normal",
  };

  return (
    <div style={textStyles} className="drag-and-drop-container">
      <label
        className="drag-and-drop-box"
        style={boxStyle}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          accept=".pdf" // Only accept PDF files
          disabled={selectedFile !== null} // Disable the input when a file is selected
        />
        {selectedFile ? (
          <div style={textStyles}>
            <strong>Selected File:</strong> {selectedFile.name}
          </div>
        ) : (
          isDragging ? "Release to Drop" : <p style={textStyles}><strong>Click</strong> to upload file&nbsp;</p>
        )}
        {selectedFile && (
          <div style={{ textAlign: "center" }}>
            <button style={buttonStyle} onClick={handleRemoveFile}>Chose again</button>
          </div>
        )}
      </label>
    </div>
  );
}

export default DragDrop;