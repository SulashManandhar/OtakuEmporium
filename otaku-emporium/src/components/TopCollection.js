import React, { Component } from "react";
import "../stylesheet/index.css";

export default class TopCollection extends Component {
  render() {
    return (
      <>
        <div className="container ">
          <div className="title">
            <h1 className="text-center">Top Collection</h1>
          </div>
          <div className="container d-flex justify-content-center">
            <div className="polaroid">
              <img
                src={process.env.PUBLIC_URL + "images/image1.png"}
                alt="Norther Lights"
              />
              <div className="polaroid-text">
                <p>Northern Lights</p>
              </div>
            </div>
            <div className="polaroid">
              <img
                src={process.env.PUBLIC_URL + "images/image2.png"}
                alt="Norther Lights"
              />
              <div className="polaroid-text">
                <p>Northern Lights</p>
              </div>
            </div>
            <div className="polaroid">
              <img
                src={process.env.PUBLIC_URL + "images/image1.png"}
                alt="Norther Lights"
              />
              <div className="polaroid-text">
                <p>Northern Lights</p>
              </div>
            </div>
            <div className="polaroid">
              <img
                src={process.env.PUBLIC_URL + "images/image2.png"}
                alt="Norther Lights"
              />
              <div className="polaroid-text">
                <p>Northern Lights</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
