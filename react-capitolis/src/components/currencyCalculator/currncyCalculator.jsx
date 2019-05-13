import React from "react";
import axios from "axios";
import "./currancyCalculator.css";

export default class CurrencyCalculator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editingResult: false,
      value: 0,
      base: "USD",
      convertTo: "EUR",
      rates: null
    };
  }

  handleKeyPress(target) {
    if (target.charCode == 13 && this.state.editingResult) {
      this.setResultValue(target);
    }
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/rates").then(res => {
      console.log("axios");
      this.setState({ ...this.state, rates: res.data.rates });
    });
  }

  setValue(e) {
    this.setState({
      ...this.state,
      value: e.target.value
    });
  }

  getValue() {
    return (
      this.state.value * this.state.rates[this.state.convertTo] || 0
    ).toLocaleString("en-US");
  }

  newCurrncyChosen(e) {
    this.setState({ ...this.state, convertTo: e.currentTarget.value });
  }

  render() {
    const { rates, base } = this.state;
    if (!rates) {
      return <div />;
    } else {
      return (
        <div className="calculator" onKeyPress={this.handleKeyPress.bind(this)}>
          <input
            value={this.state.value}
            onChange={this.setValue.bind(this)}
            type="number"
            placeholder="0.00"
            className="value-to-convert"
          />
          <div className="value-to-convert">{base} =</div>

          <input
            type="text"
            readOnly
            disabled
            id="calculator-result"
            className="value-to-convert disabled"
            value={this.getValue.bind(this)()}
          />
          <select
            value={this.state.convertTo}
            className="value-to-convert calculator-selector"
            onChange={this.newCurrncyChosen.bind(this)}
          >
            {Object.keys(rates).map(currency => (
              <option
                key={currency}
                value={currency}
                defaultValue={this.state.convertTo}
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
