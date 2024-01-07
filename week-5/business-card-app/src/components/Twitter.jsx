import React from "react";

function TwitterButton(props) {
  const redirectToTwitter = () => {
     window.location.href = props.twitter;
  };

  return <button className="button" onClick={redirectToTwitter}>Twitter</button>;
};

export default TwitterButton;


