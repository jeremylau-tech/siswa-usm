import React, { useState, useEffect } from "react";

function MessagePage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://docker.usm.my:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default MessagePage;
