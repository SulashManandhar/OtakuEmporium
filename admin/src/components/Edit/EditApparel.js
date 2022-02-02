import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/apparel.css";
import "../../stylesheets/bootstrap.min.css";

export const EditApparel = () => {
  //props
  const location = useLocation();
  const { editId } = location.state;

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [apparelData, setApparelData] = useState([]);

  const addData = () => {
    var listArray = [];
    var checkboxes = document.querySelectorAll(".btn-check");

    for (var checkbox of checkboxes) {
      if (checkbox.checked) {
        //console.log("checkbox:"+checkbox.value);
        listArray.push(checkbox.value);
      }
    }

    axios
      .patch("http://localhost:3004/apparels/" + editId, {
        name: document.getElementById("product-name").value,
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        color: document.getElementById("product-color").value,
        size: listArray,
        price: document.getElementById("product-price").value,
        image: `/uploads/${filename}`,
      })
      .then((res) => {
        console.log(res);
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

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
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
    console.log(`Filename:${filename}`);
  };

  let newData = {};

  //updata datas
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3004/apparels");
      setApparelData(res.data);
      // console.log(res.data);
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
          size: item.size,
          price: item.price,
        };
        console.log(newData);
      }
    });
  }
  return (
    <>
      <div className="apparel-body">
        <div>
          <span className="header">Edit a apparel</span>

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
              <option value="SweatShirt">SweatShirt</option>
              <option value="Hoodie">Hoodie</option>
              <option value="Full-sleeve T-shirt">Full-sleeve T-shirt</option>
              <option value="Half-sleeve T-shirt">Half-sleeve T-shirt</option>
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

          {/* Product Size */}
          <div
            className="mb-3"
            id="product-size"
            role="group"
            aria-label="Product Size selection"
          >
            <label htmlFor="ProductSize" className="form-label">
              Product Size:
            </label>
            <br />
            <input
              type="checkbox"
              value="small"
              className="btn-check"
              id="small"
              autoComplete="off"
            />
            <label
              id="checkbox"
              className="btn btn-outline-success"
              htmlFor="small"
            >
              Small
            </label>
            <input
              type="checkbox"
              value="medium"
              className="btn-check"
              id="medium"
              autoComplete="off"
              defaultChecked
            />
            <label
              id="checkbox"
              className="btn btn-outline-success"
              htmlFor="medium"
            >
              Medium
            </label>
            <input
              type="checkbox"
              value="large"
              className="btn-check"
              id="large"
              autoComplete="off"
            />
            <label
              id="checkbox"
              className="btn btn-outline-success"
              htmlFor="large"
            >
              Large
            </label>
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
