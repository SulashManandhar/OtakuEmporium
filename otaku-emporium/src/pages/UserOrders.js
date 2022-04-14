import React from "react";

export const UserOrders = () => {
  return (
    <>
      <div className="container mt-3 mb-2">
        <div className="user-profile-header mb-3">
          <span className="h4">My Orders</span>
        </div>

        <div className="list-group mb-3">
          <a
            href="#"
            className="list-group-item list-group-item-action d-flex gap-3 py-3 mb-2"
            aria-current="true"
          >
            <img
              src="https://github.com/twbs.png"
              alt="twbs"
              width="48"
              height="48"
              className="rounded-circle flex-shrink-0"
            />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Product Name</h6>
                <p className="mb-0 opacity-75">
                  Some placeholder content in a paragraph.
                </p>
              </div>
              <div>
                <p className="mb-0 opacity-75">Quantity: 1</p>
              </div>

              <small className="opacity-50 text-nowrap">time</small>
            </div>
          </a>
        </div>

        <div className="list-group mb-3">
          <a
            href="#"
            className="list-group-item list-group-item-action d-flex gap-3 py-3 mb-2"
            aria-current="true"
          >
            <img
              src="https://github.com/twbs.png"
              alt="twbs"
              width="48"
              height="48"
              className="rounded-circle flex-shrink-0"
            />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 className="mb-0">Product Name</h6>
                <p className="mb-0 opacity-75">
                  Some placeholder content in a paragraph.
                </p>
              </div>
              <div>
                <p className="mb-0 opacity-75">Quantity: 1</p>
              </div>

              <small className="opacity-50 text-nowrap">time</small>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
