import React from "react";
import { Link } from "react-router-dom";

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
      <a className="navbar-brand">
        <Link to='/LandingPage' className='p-4'><img src="/navBar_Logo.png" alt="Your Logo" style={{ width: "200px" }} /></Link>
      </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="https://hac.usm.my/" style={linkStyle}>Penginapan</a>
            <a className="nav-item nav-link" href="https://www.instagram.com/unitkaunselingusm/?hl=en" style={linkStyle}>Kaunseling</a>
            <a className="nav-item nav-link" href="#" style={linkStyle}><Link to='/Login' className='p-4'>Log Masuk</Link></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
