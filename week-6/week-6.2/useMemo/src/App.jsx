import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  
  const [sum, setSum] = useState(0);

  return (
    <div>
      <input type="text" placeholder="Enter number" />
      <button >Calculate Sum</button>
    </div>
  );
}

function CounterMemo({ number }) {
  return <div>`Sum is ${number}`

  </div>;

}

export default App;
