import React from "react";
import './FormPage.css';

function FormPage() {
  return (
    <div className="form-page">
      <div className="form-column left">
        <h2 className="left-header" >Borang Permohonan<br />Bantuan Khairat<br />Kematian</h2>
        <p className="left-header-para" >Lorem ipsum dolor sit amet, consectetur <br />
        adipiscing elit. Vulputate ut laoreet velit ma.</p>
      </div>
      <div className="form-column right">
        <h2 className="right-header">Sila Isi Borang Permohonan</h2>
        <p className="right-header-para">
        Pastikan maklumat yang diisi tepat & sahih
        </p>
        <form >
          <div className="form-group">
            <label htmlFor="email2">Name:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Email:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Course:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Matric Num:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">IC Num:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          <div className="form-group">
            <label htmlFor="email2">Year:</label>
            <input type="email" id="email2" name="email2" />
          </div>
          {/* Add more form fields as needed */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
