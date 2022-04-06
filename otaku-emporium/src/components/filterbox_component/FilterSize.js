import React from "react";

export const FilterSize = () => {
  const handleSize = () => {
    let data = {
      smallSize: document.getElementById("size-small").checked ? 1 : 0,
      mediumSize: document.getElementById("size-medium").checked ? 1 : 0,
      largeSize: document.getElementById("size-large").checked ? 1 : 0,
    };
    console.log(data);
  };
  return (
    <>
      <div className="col-md mt-4">
        <div className="h3 border-bottom">Size</div>
        <form className="form">
          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="small"
              id="size-small"
              className="me-2"
              onClick={handleSize}
            />
            <label htmlFor="small">Small</label>
          </div>

          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="medium"
              id="size-medium"
              className="me-2"
              onClick={handleSize}
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="col-md mb-1">
            <input
              type="checkbox"
              name="large"
              id="size-large"
              className="me-2"
              onClick={handleSize}
            />
            <label htmlFor="large">Large</label>
          </div>
        </form>
      </div>
    </>
  );
};
