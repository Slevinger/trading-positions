import React from "react";
import axios from "axios";
import "./currancyCalculator.css";

export default class CurrencyCalculator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: 0, base: "USD", convertTo: "EUR", rates: null };
  }

  renderCalculator() {}

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/rates").then(res => {
      console.log("axios");
      this.setState({ rates: res.data.rates });
    });
  }

  setValue(e) {
    this.setState({
      value: e.target.value
    });
  }
  getValue() {
    return this.state.value * this.state.rates[this.state.convertTo] || 0;
  }

  newCurrncyChosen(e) {
    this.setState({ convertTo: e.currentTarget.value });
  }

  render() {
    const { rates, base } = this.state;
    if (!rates) {
      return <div />;
    } else {
      return (
        <div className="calculator">
          <input
            onChange={this.setValue.bind(this)}
            type="number"
            placeholder="0.00"
            className="value-to-convert"
          />
          <div className="value-to-convert">{base}</div>

          <div className="claculator-button">=</div>

          <input
            type="number"
            readOnly
            className="value-to-convert"
            value={this.getValue()}
          />
          <select
            value={this.state.convertTo}
            className="value-to-convert"
            onChange={this.newCurrncyChosen.bind(this)}
          >
            {Object.keys(rates).map(currency => (
              <option
                key={currency}
                value={currency}
                selected={this.state.convertTo == currency}
              >
                {currency}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
}
