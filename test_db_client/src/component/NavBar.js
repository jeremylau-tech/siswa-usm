import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate  } from "react-router-dom"; // Import useHistory from react-router-dom

function Navbar() {
  const email = Cookies.get('email');
  const password = Cookies.get('password');
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the cookies
    Cookies.remove('email');
    Cookies.remove('password');
    window.location.href = '/Login';
  };

  const renderLoginLogoutLink = () => {
    if (email && password) {
      // If cookies exist, render "Log Keluar" with a logout handler
      return (
        <a className="nav-item nav-link" href="#" style={{
          color: '#0d6efd',
          textDecoration: 'underline',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#1752c5')}
        onMouseLeave={(e) => (e.target.style.color = '#0d6efd')}onClick={handleLogout}>Log Keluar</a>
        );
    } else {
      // If cookies don't exist, render "Log Masuk"
      return (
        <a className="nav-item nav-link" href="#" style={linkStyle}><Link to='/Login' className='p-4'>Log Masuk</Link></a>
      );
    }
  };

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
          <Link to='/' className='p-4'><img src="/navBar_Logo.png" alt="Your Logo" style={{ width: "200px" }} /></Link>
        </a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <a className="nav-item nav-link" href="https://hac.usm.my/" style={linkStyle}>Penginapan</a>
          <a className="nav-item nav-link" href="https://www.instagram.com/unitkaunselingusm/?hl=en" style={linkStyle}>Kaunseling</a>
            {renderLoginLogoutLink()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
