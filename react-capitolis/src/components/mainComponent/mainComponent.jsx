import React from "react";
import Header from "./header/header";
import FinUnitsGrid from "../finUnitGrid/finUnitGrid";
import "./mainComponent.css";

export default class MainComponent extends React.PureComponent {
  render() {
    return (
      <div className="main-component">
        <Header />
        <div className="grid-wrapper">
          <FinUnitsGrid />
        </div>
      </div>
    );
  }
}
