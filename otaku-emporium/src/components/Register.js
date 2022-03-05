import React, { useState } from "react";
import "../stylesheet/register.css";

export const Register = () => {
  const [data, setData] = useState({});

  const getData = () => {
    setData({
      fname: document.getElementById("fname").value,
      lanme: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      RePassword: document.getElementById("re-password").value,
      phone: document.getElementById("phone-num").value,
      district: document.getElementById("district").value,
      location: document.getElementById("location").value,
      province: document.getElementById("province").value,
    });
  };
  const checkValidation = (e) => {
    e.preventDefault();
    getData();
    console.log(data);
  };
  return (
    <>
      <div>
        <h2>Register Now!!!</h2>
        <hr />
      </div>
      <br />
      <form
        className="row g-3 needs-validation"
        noValidate
        onSubmit={checkValidation}
      >
        {/* First Name  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            placeholder="Happy"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Last Name  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            placeholder="Smith"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Email Address  */}
        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email Address
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
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
        <div className="col-md-4">
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

        {/* Re-enter your password  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="re-password"
            placeholder="*******"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* Phone Number */}
        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Phone Number:
          </label>
          <input
            type="number"
            className="form-control"
            id="phone-num"
            placeholder="98********"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        {/* District  */}
        <div className="col-md-4">
          <label htmlFor="validationCustom04" className="form-label">
            District
          </label>
          <select className="form-select" id="district" required>
            <option value="Kathmandu">Kathmandu</option>

            {/* %{--Mechi--}% */}

            <option value="Taplejung">Taplejung</option>
            <option value="Panchthar">Panchthar</option>
            <option value="Ilam">Ilam</option>
            <option value="Jhapa">Jhapa</option>
            {/* %{--Koshi--}% */}
            <option value="Morang">Morang</option>
            <option value="Sunsari">Sunsari</option>
            <option value="Dhankutta">Dhankutta</option>
            <option value="Sankhuwasabha">Sankhuwasabha</option>
            <option value="Bhojpur">Bhojpur</option>
            <option value="Terhathum">Terhathum</option>
            {/* %{--Sagarmatha--}% */}
            <option value="Okhaldunga">Okhaldunga</option>
            <option value="Khotang">Khotang</option>
            <option value="Solukhumbu">Solukhumbu</option>
            <option value="Udaypur">Udaypur</option>
            <option value="Saptari">Saptari</option>
            <option value="Siraha">Siraha</option>
            {/* %{--Janakpur--}% */}
            <option value="Dhanusa">Dhanusa</option>
            <option value="Mahottari">Mahottari</option>
            <option value="Sarlahi">Sarlahi</option>
            <option value="Sindhuli">Sindhuli</option>
            <option value="Ramechhap">Ramechhap</option>
            <option value="Dolkha">Dolkha</option>
            {/* %{--Bagmati--}% */}
            <option value="Sindhupalchauk">Sindhupalchauk</option>
            <option value="Kavreplanchauk">Kavreplanchauk</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Nuwakot">Nuwakot</option>
            <option value="Rasuwa">Rasuwa</option>
            <option value="Dhading">Dhading</option>
            {/* %{--Narayani--}% */}
            <option value="Makwanpur">Makwanpur</option>
            <option value="Rauthat">Rauthat</option>
            <option value="Bara">Bara</option>
            <option value="Parsa">Parsa</option>
            <option value="Chitwan">Chitwan</option>
            {/* %{--Gandaki--}% */}
            <option value="Gorkha">Gorkha</option>
            <option value="Lamjung">Lamjung</option>
            <option value="Tanahun">Tanahun</option>
            <option value="Tanahun">Tanahun</option>
            <option value="Syangja">Syangja</option>
            <option value="Kaski">Kaski</option>
            <option value="Manag">Manag</option>
            {/* %{--Dhawalagiri--}% */}
            <option value="Mustang">Mustang</option>
            <option value="Parwat">Parwat</option>
            <option value="Myagdi">Myagdi</option>
            <option value="Myagdi">Myagdi</option>
            <option value="Baglung">Baglung</option>
            {/* %{--Lumbini--}% */}
            <option value="Gulmi">Gulmi</option>
            <option value="Palpa">Palpa</option>
            <option value="Nawalparasi">Nawalparasi</option>
            <option value="Rupandehi">Rupandehi</option>
            <option value="Arghakhanchi">Arghakhanchi</option>
            <option value="Kapilvastu">Kapilvastu</option>
            {/* %{--Rapti--}% */}
            <option value="Pyuthan">Pyuthan</option>
            <option value="Rolpa">Rolpa</option>
            <option value="Rukum">Rukum</option>
            <option value="Salyan">Salyan</option>
            <option value="Dang">Dang</option>
            {/* %{--Bheri--}% */}
            <option value="Bardiya">Bardiya</option>
            <option value="Surkhet">Surkhet</option>
            <option value="Dailekh">Dailekh</option>
            <option value="Banke">Banke</option>
            <option value="Jajarkot">Jajarkot</option>
            {/* %{--Karnali--}% */}
            <option value="Dolpa">Dolpa</option>
            <option value="Humla">Humla</option>
            <option value="Kalikot">Kalikot</option>
            <option value="Mugu">Mugu</option>
            <option value="Jumla">Jumla</option>
            {/* %{--Seti--}% */}
            <option value="Bajura">Bajura</option>
            <option value="Bajhang">Bajhang</option>
            <option value="Achham">Achham</option>
            <option value="Doti">Doti</option>
            <option value="Kailali">Kailali</option>
            {/* %{--Mahakali--}% */}
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Dadeldhura">Dadeldhura</option>
            <option value="Baitadi">Baitadi</option>
            <option value="Darchula">Darchula</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid district.
          </div>
        </div>

        {/* Location  */}
        <div className="col-md-5">
          <label htmlFor="validationCustom03" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location around your area"
            required
          />
          <div className="invalid-feedback">
            Please provide a valid location.
          </div>
        </div>

        {/* Province Number  */}
        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            District
          </label>
          <select className="form-select" id="province" required>
            <option value="3">3</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="invalid-feedback">
            Please select a valid Province.
          </div>
        </div>

        {/* Submit button  */}
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
