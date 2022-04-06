import React, { useState } from "react";

//react-icons
import { HiUsers } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";

//stylesheet
import "../stylesheet/account.css";

//pages and components
import UserProfile from "./UserProfile";
import UserOrders from "./UserOrders";
import axios from "axios";

//redux import
import { useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";
import { ChangePassword } from "../components/ChangePassword";

export const Account = (props) => {
  //redux state

  const dispatch = useDispatch();
  //useState
  const [page, setPage] = useState("UserProfile");

  const logOut = () => {
    axios
      .get("http://localhost:4600/users/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          sessionStorage.clear();
          const reduxDefaultValue = {
            id: 1,
            fname: "",
            lname: "",
            email: "",
            phone: "",
            province: 0,
            district: "",
            location: "",
          };
          //updating redux state
          dispatch(setLoggedUserData(reduxDefaultValue));
          setTimeout(props.history.push("/login"), 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setPageChangePassword = () => {
    setPage("ChangePassword");
    console.log(page);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="account-sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
              <div className="mb-2">
                <span className="h4">Setting</span>
                <hr />
              </div>
              <ul className="nav nav-pills flex-column mb-auto">
                {/* UserProfile link  */}
                <li
                  className={
                    page === "UserProfile" || page === "ChangePassword"
                      ? "nav-link nav-link link-dark active pointer"
                      : "nav-link nav-link link-dark pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("UserProfile");
                    console.log("UserProfile");
                  }}
                >
                  <HiUsers className="me-2 icon-size " />
                  My Profile
                </li>
                {/* UserOrder link  */}
                <li
                  className={
                    page === "UserOrder"
                      ? "nav-link nav-link link-dark active pointer"
                      : "nav-link nav-link link-dark pointer"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("UserOrder");
                    console.log("UserOrder");
                  }}
                >
                  <AiOutlineTable className="me-2 icon-size" />
                  My orders
                </li>

                {/* Logout link */}
                <li className="nav-item ">
                  <button
                    className="nav-link nav-link link-dark"
                    onClick={logOut}
                  >
                    <BiLogOut className="me-2 icon-size" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col bg-red">
            {page === "UserProfile" ? (
              <UserProfile
                setPageChangePassword={setPageChangePassword}
                history={props.history}
              />
            ) : (
              ""
            )}
            {page === "UserOrder" ? <UserOrders /> : ""}
            {page == "ChangePassword" ? <ChangePassword logOut={logOut} /> : ""}
          </div>
        </div>
      </div>

      <div className="clearfix"></div>
    </>
  );
};

export default Account;
