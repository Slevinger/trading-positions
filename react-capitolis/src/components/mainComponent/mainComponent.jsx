import React from "react";
import axios from "axios";

import Header from "./header/header";
import GeneralGrid from "../grids/generalGrid";
import { getHeadersAsRow, headers } from "./grid-config";
import "./mainComponent.css";

const states = {
  INITIATING: "initiating",
  ONGOING: "ongoing"
};

export default class MainComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setPositionsFromData = this.setPositionsFromData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      rows: [],
      totals: [],
      state: states.INITIATING
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
  getCurrentStateRowForRowId(rowId) {
    let row = this.state.rows.find(row => row.id == rowId);
    return row || {};
  }

  setPositionsFromData(data) {
    const totalsAcc = {};
    const rows = data.map(fuPosition => {
      const currentRow = this.getCurrentStateRowForRowId(fuPosition.id);
      let row;
      if (currentRow.rate == fuPosition.rate) {
        row = currentRow;
      } else {
        row = { ...fuPosition.currency };
        row.name = fuPosition.name;
        row.rate = fuPosition.rate;
        row.id = fuPosition.id;
        row.value = row.notionalValue / row.rate;
      }
      totalsAcc[row.name] = totalsAcc[row.name] || 0;
      totalsAcc[row.name] += row.value;
      return row;
    });
    const totals = Object.keys(totalsAcc).map(funame => {
      return { name: funame, value: totalsAcc[funame] };
    });
    this.setState({ ...this.state, state: states.ONGOING, rows, totals });
  }

  renderSpinner() {
    return <div className="spinner" />;
  }

  renderMain() {
    if (this.state.state == states.INITIATING) {
      return this.renderSpinner();
    } else {
      return (
        <div className="grid-wrapper">
          <GeneralGrid
            key="financialUnitsPositions"
            headerRow={getHeadersAsRow("financialUnitsPositions")}
            headers={headers.financialUnitsPositions}
            rows={this.state.rows}
          />
          <GeneralGrid
            key="financialUnitsPositionsSums"
            headerRow={getHeadersAsRow("financialUnitsPositionsSums")}
            headers={headers.financialUnitsPositionsSums}
            rows={this.state.totals}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-component">
        <Header />
        {this.renderMain()}
      </div>
    );
  }
}
