import React from "react";
import './FormPage.css';

function KhairatFormPage() {
  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E',
    color: 'white',
  };

  return (
    <div className="mt-5 form-page">
      <div className="form-column form-column-left">
        <h2 className="left-header">Borang Permohonan<br />Bantuan Khairat<br />Kematian</h2>
        <p className="left-header-para">#USMCares</p>
      </div>
      <div className="form-column form-column-right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">
          Pastikan maklumat yang diisi tepat & sahih
        </p>
        <form class="form-style">
          <div className="form-group">
<<<<<<< HEAD
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
=======
            <label htmlFor="email2">Nama
            <input type="email" id="email2" name="email2" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email2">Emel</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Matric Num</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">IC Num</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Year</label>
            <input type="email" id="email2" name="email2" />
>>>>>>> 9d8f2bdf24d71ebd8c1b747c8f72c9dd4f87e664
          </div>
          {/* Add more form fields as needed */}
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default KhairatFormPage;
