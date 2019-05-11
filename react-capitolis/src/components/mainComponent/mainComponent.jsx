import React from "react";
import axios from "axios";

import Header from "./header/header";
import GeneralGrid from "../grids/generalGrid";
import { getHeadersAsRow, headers } from "./grid-config";
import "./mainComponent.css";

export default class MainComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setPositionsFromData = this.setPositionsFromData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      rows: [],
      totals: []
    };
  }

  fetchData() {
    axios.get("http://127.0.0.1:8080/financial_unists_positions").then(res => {
      console.log("axios");
      this.setPositionsFromData(res.data);
    });
  }
  componentDidMount() {
    setTimeout(this.fetchData, 3000);
  }

  setPositionsFromData(data) {
    const totalsAcc = {};
    const rows = data.map(fuPosition => {
      const row = { ...fuPosition.currency };
      // console.log(option);
      row.name = fuPosition.name;
      row.rate = fuPosition.rate;
      row.id = fuPosition.id;
      row.value = row.notionalValue / row.rate;
      totalsAcc[row.name] = totalsAcc[row.name] || 0;
      totalsAcc[row.name] += row.value;
      return row;
    });
    const totals = Object.keys(totalsAcc).map(funame => {
      return { name: funame, value: totalsAcc[funame] };
    });
    this.setState({ rows, totals });
  }

  render() {
    return (
      <div className="main-component">
        <Header />
        <div className="grid-wrapper">
          <GeneralGrid
            headerRow={getHeadersAsRow("financialUnitsPoisions")}
            headers={headers.financialUnitsPoisions}
            rows={this.state.rows}
          />
          <GeneralGrid
            headerRow={getHeadersAsRow("financialUnitsPoisionsSums")}
            headers={headers.financialUnitsPoisionsSums}
            rows={this.state.totals}
          />
        </div>
      </div>
    );
  }
}
