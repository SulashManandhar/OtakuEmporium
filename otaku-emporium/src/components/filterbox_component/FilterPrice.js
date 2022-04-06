import React, { useState } from "react";

export const FilterPrice = () => {
  const [rangeValue, setRangeValue] = useState(500);
  const handleRange = () => {
    let range_value = document.getElementById("range-value").value;
    setRangeValue(range_value);
  };
  return (
    <>
      <div className="col-md mt-4">
        <div className="h3 border=bottom">Price</div>
        <div className="form">
          <div className="col-md mb-1">
            <input
              type="range"
              className="form-range"
              min="500"
              max="5000"
              defaultValue="2500"
              step="100"
              id="range-value"
              onChange={handleRange}
            />
            <p className="text-center">Rs. {rangeValue} </p>
          </div>
        </div>
      </div>
    </>
  );
};
