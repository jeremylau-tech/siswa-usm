import React from "react";
import DragDrop from "./functions/DragDrop"; // Import the DragAndDrop component

function TestAllFunction() {
  const showAlert = () => {
    alert('Button clicked in TestAllFunction!');
  };

  return (
    <div className="App">
      <h1>Hello, this is new TestAllFunction</h1>
      <button onClick={showAlert}>Show Alert</button>
      <DragDrop /> {/* Render the DragAndDrop component */}

    </div>
  );
}

export default TestAllFunction;
