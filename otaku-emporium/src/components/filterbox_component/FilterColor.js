import React from "react";

export const FilterColor = () => {
  return (
    <>
      <div className="col-md mt-4">
        <div className="h3 border-bottom">Color</div>
        <form className="form">
          {/* Red color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="red-color"
              name="color"
              value="red"
              className="me-2"
            />
            <label htmlFor="Red">Red</label>
          </div>
          {/* Black color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="black-color"
              name="color"
              value="black"
              className="me-2"
            />
            <label htmlFor="Black">Black</label>
          </div>
          {/* Blue Color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="blue-color"
              name="color"
              value="blue"
              className="me-2"
            />
            <label htmlFor="Black">Blue</label>
          </div>
          {/* White Color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="white-color"
              name="color"
              value="white"
              className="me-2"
            />
            <label htmlFor="Black">White</label>
          </div>
          {/* Orange Color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="orange-color"
              name="color"
              value="orange"
              className="me-2"
            />
            <label htmlFor="Black">Orange</label>
          </div>

          {/* Yellow Color  */}
          <div className="col-md mb-1">
            <input
              type="radio"
              id="yellow-color"
              name="color"
              value="yellow"
              className="me-2"
            />
            <label htmlFor="Black">Yellow</label>
          </div>
        </form>
      </div>
    </>
  );
};
