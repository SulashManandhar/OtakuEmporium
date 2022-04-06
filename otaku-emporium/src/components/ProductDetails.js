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
                <label htmlFor="color of the product">Available color: </label>
                <br />
                <span className="color-span">{productData.color}</span>
              </div>

              {/* product Size  */}
              {productData.small_size ? (
                <div className="container mt-3">
                  <span className="span">
                    Available size: <br />
                  </span>

                  {/* Small size  */}
                  <span className="me-3">
                    <input
                      type="radio"
                      className="btn-check"
                      name="product-size"
                      id="success-outlined"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-success mt-2"
                      htmlFor="small size"
                    >
                      Small
                    </label>
                  </span>

                  {/* Medium size  */}
                  <span className="me-3">
                    <input
                      type="radio"
                      className="btn-check"
                      name="product-size"
                      id="success-outlined"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-success mt-2"
                      htmlFor="medium size"
                    >
                      Medium
                    </label>
                  </span>

                  {/* Large size  */}
                  <span className="me-3">
                    <input
                      type="radio"
                      className="btn-check"
                      name="product-size"
                      id="success-outlined"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-success mt-2"
                      htmlFor="large size"
                    >
                      Large
                    </label>
                  </span>
                </div>
              ) : null}

              {/* Button container  */}
              <div className="container mt-3 ">
                <button
                  type="submit"
                  className="btn btn-group btn-success me-2"
                >
                  Buy Now
                </button>
                <button type="submit" className="btn btn-group btn-warning">
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
