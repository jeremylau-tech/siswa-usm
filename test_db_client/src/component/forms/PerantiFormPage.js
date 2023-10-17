import React from "react";
import './FormPage.css';

function PerantiFormPage() {
  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E',
    color: 'white',
  };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">Borang Permohonan<br />Peranti</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">
          Pastikan maklumat yang diisi tepat & sahih
        </p>
        <form class="form-style">
          <div className="form-group">
            <label htmlFor="nama">Nama:</label>
            <input type="text" id="nama" name="nama" />
          </div>
          <div className="form-group">
            <label htmlFor="emel">Emel:</label>
            <input type="email" id="emel" name="emel" />
          </div>
          <div className="form-group">
            <label htmlFor="matricNum">Matric Num:</label>
            <input type="text" id="matricNum" name="matricNum" />
          </div>
          <div className="form-group">
            <label htmlFor="icNum">IC Num:</label>
            <input type="text" id="icNum" name="icNum" />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input type="text" id="year" name="year" />
          </div>
          {/* Add more form fields as needed */}
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PerantiFormPage;
