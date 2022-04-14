import React, { useEffect, useState } from "react";
import axios from "axios";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { setLoggedUserData } from "../actions/Action";
import { AiOutlineMinus } from "react-icons/ai";

//stylesheet
import "../stylesheet/cart.css";

export const Cart = (props) => {
  const userData = useSelector((state) => state.loggedUserData);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  //get userData
  useEffect(() => {
    if (userData.name === undefined) {
      if (!sessionStorage.getItem("user")) {
        props.history.push("/login");
      }
      dispatch(setLoggedUserData(JSON.parse(sessionStorage.getItem("user"))));
    }
  }, []);

  //fetching user wishlist data
  useEffect(() => {
    axios
      .post(`http://localhost:4600/cart/getUserCart/${userData.id}`)
      .then((res) => {
        //set data
        setData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [userData]);

  //set total number of item, total price
  const getPurchaseInfo = () => {
    //set total number of item
    setTotalItem(data.length);
    //set total price
    let temp = 0;
    for (let i = 0; i < data.length; i++) {
      temp += data[i].price * data[i].quantity;
    }
    setTotalAmount(temp);
  };

  useEffect(() => {
    let cardData = [];
    data.forEach((item) => {
      cardData.push(
        <div className="list-group mb-3  position-relative  " key={item.id}>
          <div
            className="list-group-item  d-flex gap-3 py-3 mb-2 hover"
            aria-current="true"
          >
            <img
              src={item.imagePath}
              alt="product_img"
              width="48"
              height="48"
              className="rounded-circle flex-shrink-0"
            />
            <div className="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h5 className="mb-0">{item.name}</h5>
                <p className="mb-0 opacity-75">Family Color: {item.date}</p>
                <p className="mb-0 opacity-75">Price: Rs. {item.price}/-</p>
              </div>
              <div>
                <p className="mb-0 opacity-75">Quantity: {item.quantity}</p>
              </div>

              <small className="opacity-100 text-nowrap">
                Total:{item.price * item.quantity}
              </small>
            </div>
          </div>
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
            onClick={(e) => {
              e.preventDefault();
              removeItem(item.id);
            }}
          >
            <AiOutlineMinus className="cart-remove" />
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      );
      setCardInfo(cardData);
    });
  }, [data]);

  //removing item from the cart
  const removeItem = (id) => {
    console.log(id);
    axios
      .post(`http://localhost:4600/cart/removeItem/${id}`)
      .then((res) => {
        console.log(res);
        let newCardData = [...data];
        newCardData = newCardData.filter((card) => card.id !== id);
        setCardInfo(newCardData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="h2 mt-4 mb-3 pb-2 border-bottom">Your Cart</div>
      <div className="row justify-content-between">
        {/* column 1; product list  */}
        <div className="col-md-8 mt-3">{cardInfo}</div>
        {/* column 2 pay  */}
        <div className="col-4 mt-3 mb-4">
          <div className="border">
            <h5 className="text-center mt-3 mb-4 ">Order Summary</h5>
            <ul className="list-group ">
              {/* Total Item  */}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>Total Item</div>
                </div>
                <span>{totalItem}</span>
              </li>
              {/* Total Amount  */}
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>Total Amount</div>
                </div>
                <span>{totalAmount}</span>
              </li>
              {/* //checkout button  */}
              <li className="list-group-item ">
                <div className="d-grid gap-2">
                  <button className="btn btn-success">Checkout</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
