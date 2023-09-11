import React from "react";
import './FormPage.css';

function FormPage() {

  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E', // You can set the border color to match the background color if you want
    color: 'white', // Set text color to contrast with the background
  };
  return (
    <div className="mt-5 form-page">
      <div className="form-column left">
        <h2 className="left-header" >Borang Permohonan<br />Bantuan Khairat<br />Kematian</h2>
        <p className="left-header-para" >#USMCares</p>
      </div>
      <div className="form-column right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">
        Pastikan maklumat yang diisi tepat & sahih
        </p>
        <form >
          <div className="form-group">
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
          </div>
          {/* Add more form fields as needed */}
          <button type="submit" style={buttonStyle} >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
