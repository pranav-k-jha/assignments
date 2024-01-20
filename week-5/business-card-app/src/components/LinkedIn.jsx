import React from "react";

function LinkedInButton(props) {
  const redirectToLinkedIn = () => {
     window.location.href = props.linkedIn;
  };

  return <button className="button" onClick={redirectToLinkedIn}>LinkedIn</button>;
};

export default LinkedInButton;



// const LinkedInButton = (props) => {
//   const redirectToLinkedIn = () => {
//     window.location.href = props.linkedIn;
//   };

//   return <button onClick={redirectToLinkedIn}>LinkedIn</button>;
// };

// export default LinkedInButton;




// const LinkedInButton = (props) => (
//   <button onClick={() => window.location.href = props.linkedIn}>
//     LinkedIn
//   </button>
// );

// export default LinkedInButton;
