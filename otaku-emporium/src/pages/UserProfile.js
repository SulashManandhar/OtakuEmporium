import React from "react";

export const UserProfile = () => {
  return (
    <div className="container">
      <div className="mt-3 mb-2">
        <div className="user-profile-header mb-3">
          <span className="h4">My Profile</span>
        </div>
        <div className="user-avatar-container">
          <div className="mb-2">
            <span className="mb-1">Avatar</span>
          </div>
          <div className="user-avatar">
            <img
              src="https://github.com/mdo.png"
              alt="user_profile_img"
              width="46"
              height="46"
              className="rounded-circle"
            />
            {/* upload button  */}
            <button
              value="Upload"
              className="btn btn-primary btn-sm ms-3"
              type="button"
            >
              Upload
            </button>

            {/* remove button  */}
            <button
              value="Remove"
              className="btn btn-outline-secondary btn-sm ms-2"
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
        {/* horizontal line */}
        <hr className="text-center ms-auto me-auto" style={{ width: "75%" }} />
        {/* Form  */}
        <form className="row g-3 mb-3  pb-4 border-bottom">
          {/* First Name  */}
          <div className="col-md-6">
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
          </div>
          {/* Last Name  */}
          <div className="col-md-6">
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
          </div>
          {/* Email Address  */}
          <div className="col-md-6 ">
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
            </div>
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label htmlFor="validationCustom02" className="form-label">
              Phone Number:
            </label>
            <input
              type="number"
              className="form-control"
              id="phone-num"
              placeholder="98********"
              required
              autoComplete="true"
            />
          </div>
        </form>

        {/* //Change password account */}
        <div className="row mb-2 pb-3 border-bottom">
          <div className="col-md-8 text-start">
            <b>Change user password</b> <br />
            Updata your old password with a new password.
          </div>
          <div className="col-md text-end">
            <button className="mt-2 btn btn-warning btn-sm">Change</button>
          </div>
        </div>
        {/* //delete account */}
        <div className="row mb-2 pb-3 border-bottom">
          <div className="col-md-8 text-start">
            <b>Delete Account</b> <br />
            By deleting your account, you will lose all your related
            information.
          </div>
          <div className="col-md text-end">
            <button className="mt-2 btn btn-danger btn-sm">
              Delete Account
            </button>
          </div>
        </div>
        {/* Save Changes  */}
        <div className="col-md mt-4 text-end">
          <button type="submit" className="btn btn-primary btn-sm  ">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
