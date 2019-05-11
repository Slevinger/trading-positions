import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FinUnitsGrid from "./components/finUnitGrid/finUnitGrid";
function App() {
  let finUnits = { "1": { name: "shir" }, "2": { name: "libi" } };
  return (
    <div className="App">
      <FinUnitsGrid />
    </div>
  );
}

export default App;
