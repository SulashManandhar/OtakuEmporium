import React, { Component } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiArrowFromTop, BiLogOut } from "react-icons/bi";
import { DiReact } from "react-icons/di";
import { BsFolderPlus } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { GrMenu } from "react-icons/gr";
import { AiOutlineSetting } from "react-icons/ai";
import Dashboard from "../components/Dashboard";
import Setting from "../components/Setting";
import Users from "../components/Users";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../stylesheets/header.css";
import Apparels from "../components/Apparels";
import Accessories from "../components/Accessories";
import AddApparel from "../components/Add/AddApparel";
import classNames from "classnames";
import { EditApparel } from "../components/Edit/EditApparel";

export default class Index extends Component {
  state = {
    close: true,
    postSubMenuClose: true,
  };

  handleBxMenu = () => {
    // console.log(!this.state.close);
    this.setState({
      close: !this.state.close,
    });
  };

  handlePostSubMenuClose = () => {
    this.setState({
      postSubMenuClose: !this.state.postSubMenuClose,
    });
  };

  render() {
    return (
      <Router>
        <div
          className={classNames({
            close: this.state.close,
            sidebar: true,
          })}
        >
          <div className="logo-details">
            <i>
              <DiReact />
            </i>
            <span className="logo_name">Otaku Emporium</span>
          </div>

          <ul className="nav-links">
            {/* Dashboard  */}
            <li>
              <Link to="/">
                <i>
                  <MdOutlineSpaceDashboard />
                </i>
                <span className="link_name">Dashboard</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </li>

            {/* Posts  */}
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i>
                    <BsFolderPlus />
                  </i>
                  <span className="link_name">Posts</span>
                </a>
                <i className="arrow" onClick={this.handlePostSubMenuClose}>
                  <BiArrowFromTop />
                </i>
              </div>
              <ul
                className={classNames({
                  "sub-menu": true,
                  "post-sub-menu": this.state.postSubMenuClose,
                })}
              >
                <li>
                  <a className="link_name">
                    <b>Posts</b>
                  </a>
                </li>

                <li>
                  <Link to="/apparels">Apparels</Link>
                </li>
                <li>
                  <Link to="/accessories">Accessories</Link>
                </li>
                <li>
                  <a href="#">Masks</a>
                </li>
              </ul>
            </li>

            {/* Users  */}
            <li>
              <Link to="/users">
                <i>
                  <HiUsers />
                </i>
                <span className="link_name">Users</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/users">
                    Users
                  </Link>
                </li>
              </ul>
            </li>

            {/* Settings  */}
            <li>
              <Link to="/setting">
                <i>
                  <AiOutlineSetting />
                </i>
                <span className="link_name">Setting</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/setting">
                    Setting
                  </Link>
                </li>
              </ul>
            </li>

            {/* Logout  */}
            <li>
              <a href="#">
                <i onClick={this.props.Logout}>
                  <BiLogOut />
                </i>
                <span className="link_name">Logout</span>
              </a>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" onClick={this.props.Logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
            {/* Profile  */}
            <li>
              <div className="profile-details">
                <div className="profile-content">
                  <img
                    src={process.env.PUBLIC_URL + "/images/profile1.jpg"}
                    alt="profileImg"
                  />
                </div>
                <div className="name-job">
                  <div className="profile_name">{this.props.name}</div>
                </div>
                <i onClick={this.props.Logout}>
                  <BiLogOut />
                </i>
              </div>
            </li>
          </ul>
        </div>

        {/* display links content */}
        <section className="home-section">
          <div className="home-content">
            <i>
              <GrMenu className="bx-menu" onClick={this.handleBxMenu} />
            </i>
            <span className="text">Admin Dashboard</span>
          </div>

          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route exact path="/setting" component={Setting}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route path="/apparels" component={Apparels}></Route>
            <Route path="/accessories" component={Accessories}></Route>
            <Route path="/addApparels" component={AddApparel}></Route>
            <Route path="/editApparels" component={EditApparel}></Route>
          </Switch>
        </section>
      </Router>
    );
  }
}
