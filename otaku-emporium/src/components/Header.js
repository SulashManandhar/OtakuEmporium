import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";

import axios from "axios";
import "../stylesheet/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
    };
  }

  getNavLinks = () => {
    axios
      .get("http://localhost:4600/getNavLinks")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        console.log("Error!!!");
      });
  };

  componentDidMount() {
    this.getNavLinks();
  }
  render() {
    return (
      <>
        <header>
          {/* header 1 */}
          <div className="header-1">
            <nav className="navbar">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  <img
                    src={process.env.PUBLIC_URL + "images/logo.png"}
                    alt="Logo of Otaku Emporium"
                    className="d-inline-block align-text-top"
                  />
                </Link>
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <BsSearch />
                  </button>
                </form>
              </div>
            </nav>
          </div>

          {/* header 2 */}
          <div className="header-2">
            <nav className="navbar navbar-expand-lg  ">
              <div className="container-fluid">
                {/* responsive button  */}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarText"
                  aria-controls="navbarText"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <AiOutlineMenu className="menu-bar" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* nav links */}
                    {this.state.data.map((item) => (
                      <li className="nav-item" key={item.id}>
                        <Link
                          className="nav-link "
                          aria-current="page"
                          to={item.tab_link}
                        >
                          {item.tab_name}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Side text  */}
                  <span className="navbar-text">
                    <div className="dropdown text-end">
                      <Link
                        to="/profile"
                        className="d-block link-dark text-decoration-none" //extra classname: dropdown-toggle
                        id="dropdownUser1"
                        // data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="https://github.com/mdo.png"
                          alt="user_profile_img"
                          width="32"
                          height="32"
                          className="rounded-circle"
                        />
                      </Link>
                      {/* <ul
                        className="dropdown-menu text-small"
                        aria-labelledby="dropdownUser1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            New project...
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Settings
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Sign out
                          </a>
                        </li>
                      </ul> */}
                    </div>
                  </span>
                  <span className="navbar-text">
                    <Link to="/cart" className="white-color">
                      <AiOutlineShoppingCart />
                    </Link>
                  </span>
                  <span className="navbar-text">
                    <Link to="/wishList" className="white-color">
                      <AiOutlineHeart />
                    </Link>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
