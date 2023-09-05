import React from "react";

function NavBar() {
  const navStyle = {
    backgroundColor: "#491E6E",
  };

  const linkStyle = {
    color: "white",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={navStyle}>
      <div className="container">
      <a className="navbar-brand" href="#">
        <img src="/navBar_Logo.png" alt="Your Logo" style={{ width: "200px" }} />
      </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#" style={linkStyle}>Utama <span className="sr-only">(Semasa)</span></a>
            <a className="nav-item nav-link" href="#" style={linkStyle}>Permohonan</a>
            <a className="nav-item nav-link" href="#" style={linkStyle}>Kelayakan</a>
            <a className="nav-item nav-link" href="#" style={linkStyle}>Mengenai Kami</a>
            <a className="nav-item nav-link" href="#" style={linkStyle}>Status Permohonan</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
