import React from "react";
import { Link } from "react-router-dom";

export const LogIn = () => {
  return (
    <>
      <div className="mt-3">
        <h2> Log in to your account</h2>
        <hr />
      </div>
      <form action="post" className="row g-3 needs-validation" noValidate>
        {/* Email Addres  */}
        <div className="col-md-8">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email Address
          </label>
          <div className="input-group has-validation">
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="inputGroupPrepend"
              placeholder="offical.otakuemporium@gmail.com"
              required
            />
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
        </div>

        {/* Password  */}
        <div className="col-md-8">
          <label htmlFor="validationCustom02" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="*******"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Log in button  */}
        <div className="col-12 mb-3">
          <button className="btn btn-primary" type="submit">
            Log in
          </button>
        </div>
      </form>

      <div className="mb-1">
        <span className="fs-6">
          Haven't registed yet? <Link to="/register">Register Now</Link>
        </span>
      </div>
    </>
  );
};

export default LogIn;
