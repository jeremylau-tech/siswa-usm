import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './FormPage.css';

function BaucarFormPage() {
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
        <h2 className="left-header">Borang Permohonan<br />Baucar Makanan</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">
          Pastikan maklumat yang diisi tepat & sahih
        </p>
        <form className="form-style"> {/* Changed 'class' to 'className' */}
          <div className="form-group">
            <label htmlFor="nama">Nama:</label>
            <input type="text" id="nama" name="nama" />
          </div>
          <div className="form-group">
            <label htmlFor="emel">Emel:</label>
            <input type="email" id="emel" name="emel" />
          </div>
          <div className="form-group">
            <label htmlFor="matricNum">Nombor Matrik:</label>
            <input type="text" id="matricNum" name="matricNum" />
          </div>
          <div className="form-group">
            <label htmlFor="icNum">Nombor Kad Pengenalan:</label>
            <input type="text" id="icNum" name="icNum" />
          </div>
          <div className="form-group">
            <label htmlFor="year">Tahun Pengajian:</label>
            <input type="text" id="year" name="year" />
          </div>

          {/* Button container */}
          <div className="button-container-form">
            <Link to="/WelcomePage">
              <button type="button" style={kembaliButtonStyle}>
                Kembali
              </button>
            </Link>

            <Link to="/FoodApplication">
              <button type="button" style={hantarButtonStyle}>
                Seterusnya
              </button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default BaucarFormPage;