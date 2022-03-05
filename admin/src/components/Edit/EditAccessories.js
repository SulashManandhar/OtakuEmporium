import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export const EditAccessories = () => {
  //props
  const location = useLocation();
  const { editId } = location.state;

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [apparelData, setApparelData] = useState([]);

  const addData = () => {
    axios
      .put("http://localhost:4600/editAccessories", {
        id: editId,
        name: document.getElementById("product-name").value,
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        color: document.getElementById("product-color").value,
        price: document.getElementById("product-price").value,
        imagePath: `/uploads/${filename}`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4600/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File Uploaded");

      addData(); //adding data to the database
      window.alert("Successfully Added to the database");
      window.location.reload();
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Error with the server");
        window.alert("Error while adding data to the database");
      } else {
        console.log(err.response.data.msg);
        window.alert("Error while adding data to the database");
      }
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  let newData = {};

  //updata datas
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:4600/getAccessories");
      setApparelData(res.data);
      return res;
    }
    fetchData();
  }, [apparelData]);

  function handleCheckData() {
    apparelData.map((item) => {
      if (item.id === editId) {
        newData = {
          name: item.name,
          category: item.category,
          description: item.description,
          color: item.color,
          price: item.price,
        };
        // console.log(newData);
      }
    });
  }
  return (
    <>
      <div className="apparel-body">
        <div>
          <span className="header">Edit a Accessories</span>

          <hr />
        </div>

        <form onSubmit={onSubmit} onLoad={handleCheckData()} className="form">
          {/* Product Name */}
          <div className="mb-3">
            <label htmlFor="ProductName" className="form-label">
              Product Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="product-name"
              aria-describedby="Name of Product"
              defaultValue={newData.name}
            />
          </div>

          {/* Product Category  */}
          <div className="mb-3">
            <label htmlFor="ProductCategory" className="form-label">
              Product Category:
            </label>
            <select
              className="form-select"
              id="product-category"
              aria-label="Category selection"
              required
            >
              <option defaultValue={newData.category}>
                {newData.category}
              </option>
              <option value="Masks">Masks</option>
              <option value="Keychain">Keychain</option>
              <option value="Wallpaper">Wallpaper</option>
              <option value="ActionFigure">ActionFigure</option>
            </select>
          </div>

          {/* Product Color */}
          <div className="mb-3">
            <label htmlFor="ProductColor" className="form-label">
              Product Color:
            </label>
            <input
              type="text"
              className="form-control"
              id="product-color"
              autoComplete="off"
              aria-describedby="Available Color of Product"
              defaultValue={newData.color}
            />
          </div>

          {/* Product Price */}
          <div className="mb-3">
            <label htmlFor="ProductPrice" className="form-label">
              Product Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="product-price"
              autoComplete="off"
              aria-describedby="Price of Product"
              defaultValue={newData.price}
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="ProductDescription" className="form-label">
              Product Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="product-description"
              aria-describedby="Description of Product"
              defaultValue={newData.description}
            />
          </div>

          {/* Add Image  */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Add a product image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              required
              onChange={onChange}
            />
          </div>

          {/* Submit  */}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
