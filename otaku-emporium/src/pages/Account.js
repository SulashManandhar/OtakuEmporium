import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

//react-icons
import { HiUsers } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineTable } from "react-icons/ai";

//stylesheet
import "../stylesheet/account.css";
//pages and components
import UserProfile from "./UserProfile";
import UserOrders from "./UserOrders";

export default class Account extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="account-sidebar d-flex flex-column flex-shrink-0 p-3 bg-light">
                <div className="mb-2">
                  <span className="h4">Setting</span>
                  <hr />
                </div>
                <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                    <Link className="nav-link nav-link active" to="/profile/">
                      <HiUsers className="me-2 icon-size" />
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link nav-link link-dark"
                      to="/profile/myOrders"
                    >
                      <AiOutlineTable className="me-2 icon-size" />
                      My orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link nav-link link-dark"
                      onClick={this.props.Logout}
                    >
                      <BiLogOut className="me-2 icon-size" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col bg-red">
              <Switch>
                <Route exact path="/profile/" component={UserProfile}></Route>
                <Route path="/profile/myOrders" component={UserOrders}></Route>
              </Switch>
            </div>
          </div>
        </div>

        <div className="clearfix"></div>
      </Router>
    );
  }
}
