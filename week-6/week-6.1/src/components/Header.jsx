import React, { useState } from "react";


function HeaderWithButton() {
  const [title, setTitle] = useState("Pranav");

  function updateTitle() {
    setTitle("My name is " + Math.random());
  }
  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
      <Header title={title}></Header>
    </div>
  );
}
function Header({ title }) {
  return <div>{title}</div>;
}
// const Header = React.memo(function Header({ title }) {
//   return <div>{title}</div>;
// });
export default Header;
export { HeaderWithButton };
