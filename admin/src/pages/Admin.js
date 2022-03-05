import React, { Component } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiArrowFromTop, BiLogOut } from "react-icons/bi";
import { DiReact } from "react-icons/di";
import { BsFolderPlus } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { GrMenu } from "react-icons/gr";
import { IoLinkSharp } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineSlideshow } from "react-icons/md";
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
import { AddAccessories } from "../components/Add/AddAccessories";
import { EditAccessories } from "../components/Edit/EditAccessories";
import Drinkware from "../components/Drinkware";
import AddDrinkware from "../components/Add/AddDrinkware";
import { EditDrinkware } from "../components/Edit/EditDrinkware";
import NavLink from "./NavLink";
import AddLink from "../components/Add/AddLink";
import SlideShow from "./SlideShow";
import AddSlider from "../components/Add/AddSlider";

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
                <Link to="#">
                  <i>
                    <BsFolderPlus />
                  </i>
                  <span className="link_name">Posts</span>
                </Link>
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
                  <Link to="/drinkware">Drinkware</Link>
                </li>
              </ul>
            </li>

            {/* Navbar Links  */}
            <li>
              <Link to="/navLinks">
                <i>
                  <IoLinkSharp />
                </i>
                <span className="link_name">Navabar</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/navLinks">
                    Navbar
                  </Link>
                </li>
              </ul>
            </li>

            {/* Slider  */}
            <li>
              <Link to="/slider">
                <i>
                  <MdOutlineSlideshow />
                </i>
                <span className="link_name">Slider</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <Link className="link_name" to="/slider">
                    Slider
                  </Link>
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

            {/* Apparels */}
            <Route path="/apparels" component={Apparels}></Route>
            <Route path="/addApparels" component={AddApparel}></Route>
            <Route path="/editApparels" component={EditApparel}></Route>
            {/* Accessories  */}
            <Route path="/accessories" component={Accessories}></Route>
            <Route path="/addAccessories" component={AddAccessories}></Route>
            <Route path="/editAccessories" component={EditAccessories}></Route>

            {/* Drinkware */}
            <Route path="/drinkware" component={Drinkware}></Route>
            <Route path="/addDrinkware" component={AddDrinkware}></Route>
            <Route path="/editDrinkware" component={EditDrinkware}></Route>

            <Route exact path="/navLinks" component={NavLink}></Route>
            <Route exact path="/addLink" component={AddLink}></Route>

            <Route exact path="/slider" component={SlideShow}></Route>
            <Route exact path="/addSlider" component={AddSlider}></Route>
          </Switch>
        </section>
      </Router>
    );
  }
}
