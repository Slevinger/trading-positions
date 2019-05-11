import React from "react";
import CurrencyCalculator from "../../currencyCalculator/currncyCalculator";
import "./header.css";

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <img
          className="capitolis-logo"
          src="https://www.capitolis.com/wp-content/themes/eprefix-bootstrap/img/toplogo.svg"
        />
        <CurrencyCalculator />
      </div>
    );
  }
}
