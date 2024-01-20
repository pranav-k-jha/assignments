import React from "react";

function Detail(props) {
  return (
    <div>
      <p className="info">{props.phone}</p>
      <p className="info"> {props.email}</p>
      <p className="info">{props.interests}</p>
      <p className="info">{props.description}</p>
    </div>
  );
}
export default Detail;
