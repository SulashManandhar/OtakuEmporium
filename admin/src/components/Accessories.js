import React, { Component } from "react";
import style from "../stylesheets/users.module.css";

import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Accessories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      flag: null,
      referenceValue: null,
    };
  }
  getUsers = () => {
    axios
      .get("http://localhost:3004/accessories")
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

  handleDelete = (itemId) => {
    console.log(itemId);
    var confimation = window.confirm(
      "Do you want to delete this data?(You cannot undo this command)"
    );
    if (confimation) {
      axios
        .delete("http://localhost:3004/accessories/" + itemId)
        .then((res) => {
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
  };
  render() {
    return (
      <>
        <div className={style.main}>
          {/* Header  */}
          <div className={style.header}>
            <span>Manage Accessories</span>
          </div>
          <div className={style.crudButton}>
            <Link to="/addApparels">
              <button type="button" className="btn btn-success">
                Add <AiOutlinePlusCircle />
              </button>
            </Link>
          </div>

          {/* Clearfix  */}
          <div className={style.clearfix}> </div>
          <hr />

          {/* Table Data  */}
          <table className={style.table}>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Product Category</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.color}</td>

                  {/* Delete button  */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleDelete(item.id);
                      }}
                    >
                      Delete <AiOutlineMinusCircle />
                    </button>
                  </td>

                  {/* Edit button  */}
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          referenceValue: item.id,
                        });
                        console.log("Edit:" + item.id);
                      }}
                    >
                      <Link
                        className="link"
                        to={{
                          pathname: "/editApparels",
                          state: {
                            editId: this.state.referenceValue,
                          },
                        }}
                      >
                        Edit <AiOutlineEdit />
                      </Link>
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
