import React from "react";

const RevenueCard = ({ title, showWarning, orderCount, amount }) => {
  return (
    <div className="bg-white shadow-sm">
      RevenueCard
      <div>{title}</div>
    </div>
  );
};

export default RevenueCard;
