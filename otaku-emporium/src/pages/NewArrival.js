import React, { useEffect, useState } from "react";
import axios from "axios";
import { FilterColor } from "../components/filterbox_component/FilterColor";
import { FilterPrice } from "../components/filterbox_component/FilterPrice";
import { FilterSize } from "../components/filterbox_component/FilterSize";

export const NewArrival = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4600/apparels/getApparels")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2 mb-2" style={{ height: "100%" }}>
          <FilterSize />
          <FilterPrice />
          <FilterColor />
        </div>
        <div className="col-md mt-3">
          <div className="h2 mb-1 pb-2 border-bottom">New Arrivals</div>
          {/* Card One  */}
          <div
            className="card mb-2 float-start me-3"
            style={{ width: "14rem" }}
          >
            <img src="/images/image2.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <span className="fs-6 text-muted ">Otaku Emporium</span>
              <p className="card-text h5 mb-1">Title</p>
              <div className="card-text h4">Rs. 999</div>
              <p className="card-text text-end text-muted">Nepal</p>
            </div>
          </div>

          {/* Card One  */}
          <div
            className="card mb-2 float-start me-3"
            style={{ width: "14rem" }}
          >
            <img src="/images/image2.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <span className="fs-6 text-muted ">Otaku Emporium</span>
              <p className="card-text h5 mb-1">Title</p>
              <div className="card-text h4">Rs. 999</div>
              <p className="card-text text-end text-muted">Nepal</p>
            </div>
          </div>

          {/* Card One  */}
          <div
            className="card mb-2 float-start me-3"
            style={{ width: "14rem" }}
          >
            <img src="/images/image2.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <span className="fs-6 text-muted ">Otaku Emporium</span>
              <p className="card-text h5 mb-1">Title</p>
              <div className="card-text h4">Rs. 999</div>
              <p className="card-text text-end text-muted">Nepal</p>
            </div>
          </div>

          {/* Card One  */}
          <div
            className="card mb-2 float-start me-3"
            style={{ width: "14rem" }}
          >
            <img src="/images/image2.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <span className="fs-6 text-muted ">Otaku Emporium</span>
              <p className="card-text h5 mb-1">Title</p>
              <div className="card-text h4">Rs. 999</div>
              <p className="card-text text-end text-muted">Nepal</p>
            </div>
          </div>

          {/* Card One  */}
          <div
            className="card mb-2 float-start me-3"
            style={{ width: "14rem" }}
          >
            <img src="/images/image2.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <span className="fs-6 text-muted ">Otaku Emporium</span>
              <p className="card-text h5 mb-1">Title</p>
              <div className="card-text h4">Rs. 999</div>
              <p className="card-text text-end text-muted">Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
