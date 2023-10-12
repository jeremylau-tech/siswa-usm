import React, { useState, useRef } from "react";
import "./DragDrop.css";

function DragDrop() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/upload", {
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
  };

  const boxStyle = {
    width: "100%",
    height: "150px",
    border: isDragging ? "2px solid green" : "2px dashed gray",
    backgroundColor: isDragging ? "lightgreen" : "lightgray",
  };

  return (
    <div className="drag-and-drop-container">
      <div
        className="drag-and-drop-box"
        style={boxStyle}
        draggable
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onClick={(e) => {
          e.stopPropagation(); // Stop event propagation
          fileInputRef.current.click(); // Trigger the file input's click event
        }}
      >
      {isDragging ? "Release to Drop" : <strong>Click&nbsp;</strong>} {isDragging ? "" : "or Drop file here"}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default DragDrop;
