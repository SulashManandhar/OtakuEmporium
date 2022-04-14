import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//stylesheet
import "../stylesheet/productDetails.css";

//react-icons
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

export const ProductDetails = (props) => {
  const [productData, setProductData] = useState([]);
  const productId = useSelector((state) => state.productId);
  const userData = useSelector((state) => state.loggedUserData);
  const pageLink = useSelector((state) => state.pageLink);

  const [isWishedIcon, setIsWishedIcon] = useState(false);
  const [quantityValue, setQuantityValue] = useState(1);
  const [size, setSize] = useState("none");

  //redirect back if product id is not found
  useEffect(() => {
    if (productId === null) {
      props.history.goBack();
    }
  }, []);

  //get product data using product id
  useEffect(() => {
    console.log(pageLink, "/", productId);
    if (productId) {
      axios
        .get(`http://localhost:4600${pageLink}/${productId}`)
        .then((res) => {
          setProductData(res.data[0]);
          // console.log(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  //checkIsWish (is this item wished already)
  useEffect(() => {
    axios
      .post("http://localhost:4600/wishlist/checkIsWished", {
        user_id: userData.id,
        item_id: productId,
        category: productData.description,
      })
      .then((res) => {
        console.log("Wishlisted?:", res.data);
        if (res.data.length !== 0) {
          setIsWishedIcon(true);
          console.log("isWished:", isWishedIcon);
        } else {
          setIsWishedIcon(false);
          console.log("isWished:", isWishedIcon);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productData]);

  //add to wishlist heart button
  const toggleWished = () => {
    //check if user is logged in
    if (userData.fname !== "") {
      // axios adding to wish list
      if (!isWishedIcon) {
        axios
          .post("http://localhost:4600/wishlist/addWishList", {
            user_id: userData.id,
            item_id: productId,
            category: productData.description,
            item_name: productData.name,
            item_price: productData.price,
            item_imagePath: productData.imagePath,
            pageLink: pageLink,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      //axios removing from the wishlist
      if (isWishedIcon) {
        axios
          .post("http://localhost:4600/wishlist/deleteWishlist", {
            user_id: userData.id,
            item_id: productId,
            category: productData.description,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      //if user is not logged in
      window.alert("You are required to login first");
      setTimeout(props.history.push("/login"), 3000);
    }
  };

  const handleAddToCart = () => {
    if (productData.small_size) {
      if (document.getElementById("small-size").checked) {
        setSize("small");
      } else if (document.getElementById("medium-size").checked) {
        setSize("medium");
      } else if (document.getElementById("large-size").checked) {
        setSize("large");
      } else {
        setSize("none");
      }
    }
    const d = new Date();

    console.log(d.getDate());

    const sendData = {
      item_id: productData.id,
      user_id: userData.id,
      name: productData.name,
      description: productData.description,
      imagePath: productData.imagePath,
      quantity: quantityValue,
      price: productData.price,
      color: productData.color,
      size: size,
      pageLink: pageLink,
      date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
    };
    console.log(sendData);

    axios
      .post("http://localhost:4600/cart/add_to_cart", sendData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container mt-5 mb-4">
        <div className="row">
          {/* image container  */}
          <div className="col-md-4">
            <img src={productData.imagePath} className="img-fluid" />
          </div>

          {/* product description container  */}
          <div className="col-md-8">
            <div className="container">
              {/* Name of product  */}
              <div className="container justify-content-between">
                <h1>{productData.name}</h1>
                <h2>
                  {isWishedIcon === true ? (
                    <AiFillHeart
                      className="icon2 ms-2"
                      onClick={() => {
                        setIsWishedIcon(!isWishedIcon);
                        console.log(isWishedIcon);
                        toggleWished();
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="icon1 ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsWishedIcon(!isWishedIcon);
                        console.log(isWishedIcon);
                        toggleWished();
                      }}
                    />
                  )}
                </h2>
              </div>

              {/* Price of the product  */}
              <div className="container">
                <h2>Rs. {productData.price}/-</h2>
              </div>
              <br />
              {/* Color of the product  */}
              <div className="container">
                <label className=" fw-bold" htmlFor="color of the product">
                  Color family:{" "}
                </label>
                <br />
                <span
                  className="color-span"
                  style={{
                    backgroundColor: productData.color,
                  }}
                ></span>
              </div>

              {/* product Size  */}
              {productData.small_size ? (
                <div className="container mt-3">
                  <label className="span fw-bold">Available size: </label>
                  <br />

                  {/* Small size  */}

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="small-size"
                      value="small"
                    />
                    <label className="form-check-label " htmlFor="small-size">
                      Small
                    </label>
                  </div>

                  {/* Medium size  */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="medium-size"
                      value="medium"
                      defaultChecked
                    />
                    <label className="form-check-label " htmlFor="medium-size">
                      Medium
                    </label>
                  </div>

                  {/* Large size  */}
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="product-size"
                      id="large-size"
                      value="large"
                    />
                    <label className="form-check-label " htmlFor="large-size">
                      Large
                    </label>
                  </div>
                </div>
              ) : null}

              {/* Quanity of a product  */}

              <div className="container mt-3 mb-1">
                <label htmlFor="color of the product" className="me-3 fw-bold">
                  Quantity:
                </label>

                <span>
                  {/*decrease the value of quantity by 1, if quantity value is 0 value is not changed; ie quantityValue*/}
                  <button
                    className="btn btn-group btn-secondary btn-sm me-3"
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantityValue === 1) {
                        return quantityValue;
                      }
                      setQuantityValue(quantityValue - 1);
                    }}
                  >
                    -
                  </button>

                  {quantityValue}
                  {/*increase the value of quantity by 1; ie quantityValue*/}

                  <button
                    className="btn btn-group btn-secondary btn-sm ms-3 "
                    onClick={(e) => {
                      e.preventDefault();
                      if (quantityValue === 10) {
                        return quantityValue;
                      }
                      setQuantityValue(quantityValue + 1);
                    }}
                  >
                    +
                  </button>
                </span>
              </div>

              {/* Button container  */}
              <div className="container mt-3 ">
                <button
                  type="submit"
                  className="btn btn-group btn-success btn-group-lg me-2"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="btn btn-group btn-group-lg btn-warning"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
