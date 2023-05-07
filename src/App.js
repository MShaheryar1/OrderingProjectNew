import "./App.css";
import { useState } from "react";
import Admin from "./Admin";

function App() {
  const [admin] = useState(true); // set initial value to true

  return (
    <div>
      <div className="App">{admin && <Admin />}</div>
    </div>
  );
}

export default App;
