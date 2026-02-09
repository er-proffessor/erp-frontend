import React from "react";

const StatCard = ({ title, count, color }) => {
  return (
    <div className="col-md-2">
      <div className="card text-center shadow-sm">
        <div className="card-body">
          <span
            className="badge mb-2"
            style={{ backgroundColor: color }}
          >
            {count}
          </span>
          <p className="mb-0">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
