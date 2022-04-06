import React, { useEffect, useState } from "react";
import axios from "axios";

//Components
import { FilterColor } from "../components/filterbox_component/FilterColor";
import { FilterPrice } from "../components/filterbox_component/FilterPrice";

//stylesheet
import "../stylesheet/responsive.css";

//Redux
import { useDispatch } from "react-redux";
import { setProductId } from "../actions/Action";
import { setPageLink } from "../actions/Action";

export const Accessories = (props) => {
  const [data, setData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4600/accessories/getAccessories")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    let cardData = [];

    data.forEach((item) => {
      cardData.push(
        <div
          className="card mb-2 float-start me-3 inner-card-width"
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setProductId(item.id));
            dispatch(setPageLink("/accessories/getAccessories"));
            props.history.push(`/productDetails`);
          }}
        >
          <img
            src={item.imagePath}
            className="card-img-top"
            alt={item.description}
          />
          <div className="card-body">
            <span className="fs-6 text-muted ">Otaku Emporium</span>
            <div className="card-text h6 mb-1 card-text-height text-capitalize ">
              {item.name}
            </div>

            <div className="card-text h4">Rs. {item.price}/-</div>
            <p className="card-text text-end text-muted">Nepal</p>
          </div>
        </div>
      );
      setCardInfo(cardData);
    });
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2 mb-4 display-none">
            <FilterPrice />

            <FilterColor />
          </div>
          <div className="col-md mt-3">
            <div className="h2 mb-1 pb-2 border-bottom">Apparels</div>
            {cardInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accessories;
