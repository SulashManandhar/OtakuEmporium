import React, { Component } from "react";
import { LogIn } from "../components/LogIn";
import Register from "../components/Register";
import "../stylesheet/register.css";

export default class Profile extends Component {
  render() {
    return (
      <>
        <div className="register-container">
          {/* <Register /> */}
          <LogIn />
        </div>
      </>
    );
  }
}
