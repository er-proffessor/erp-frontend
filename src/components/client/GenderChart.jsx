import React from "react";

const GenderChart = () => {
  return (
    <div className="card p-4">
      <h6 className="text-info mb-3">Student By Gender</h6>
      <div className="text-center">
        <h6>Boys: 11</h6>
        <h6>Girls: 2</h6>
        <div
          className="rounded-circle mx-auto mt-3"
          style={{
            width: "200px",
            height: "200px",
            border: "20px solid #66c2d1",
            borderTopColor: "#b7e1cd",
          }}
        />
      </div>
    </div>
  );
};

export default GenderChart;
