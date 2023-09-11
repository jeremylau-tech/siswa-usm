import React, { useState } from 'react';

function TermsAndConditions() {
  const [agree, setAgree] = useState(false);

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (agree) {
      // Handle form submission or navigation here
    } else {
      alert('Please agree to the terms and conditions.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="container mt-12">
      <div className="card mt-5">
        <div className="card-body">
          <h2 className="card-title text-center mt-4">Terms and Conditions</h2>
          <h3>Heading 1</h3>
          <p>This is a sample paragraph for heading 1.</p>

          <h3>Heading 2</h3>
          <p>This is a sample paragraph for heading 2.</p>

          <h3>Heading 3</h3>
          <p>This is a sample paragraph for heading 3.</p>

          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={agree}
                  onChange={handleAgreeChange}
                />
                <label className="form-check-label" htmlFor="agreeCheckbox">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <div className="text-center mt-3 px-5">
              {/* Set a specific width for the button using Bootstrap's "w-*" class */}
              <button type="submit" className="btn btn-primary btn-lg btn-sm">
                Hantar Permohonan
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
