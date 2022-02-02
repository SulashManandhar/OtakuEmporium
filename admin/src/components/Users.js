import React, { Component } from "react";
import axios from "axios";
import style from "../stylesheets/users.module.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import "../stylesheets/bootstrap.min.css";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
    };
  }

  getUsers = () => {
    axios
      .get("http://localhost:3004/users")
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
    this.getUsers();
  }
  componentDidUpdate() {
    this.getUsers();
  }

  banData = (itemId) => {
    let userToBeModified = this.state.data.filter((item) => item.id === itemId);
    console.log(userToBeModified);
    let isBan = !userToBeModified[0].ban;
    //isBan?console.log("Ban is true"):console.log("ban is false");
    console.log(isBan);
    axios
      .patch("http://localhost:3004/users/" + itemId, {
        ban: isBan,
      })
      .then((res) => {
        this.getUsers();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteData = (itemId) => {
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:3004/users/" + itemId)
        .then((res) => {
          this.getUsers();
          console.log(res);
          console.log("Successfully deleted data.");
          alert("Successfully delete the data");
        })
        .catch((res) => {
          console.log(res);
          alert("Data was not deleted.");
        });
    } else {
      alert("Data was not deleted.");
    }
    // window.location.reload();
  };

  render() {
    return (
      <>
        <div className={style.main}>
          <div className={style.header}>
            <span>Manage Users</span>
          </div>
          <hr />
          <table className={style.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Ban</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td className={style.email}>{item.email}</td>
                  <td>{item.ban ? "Yes" : "No"}</td>
                  {/* Ban Data  */}
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.banData(item.id);
                      }}
                    >
                      Ban <HiOutlineBan />
                    </button>
                  </td>
                  {/* Delete Data  */}
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.deleteData(item.id);
                      }}
                    >
                      {" "}
                      Delete <AiOutlineMinusCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
