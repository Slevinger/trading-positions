import React from "react";
import axios from "axios";

import Header from "./header/header";
import GeneralGrid from "../grids/generalGrid";
import { getHeadersAsRow, gridConfigs } from "./grid-config";
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
      filterdTotals: [],
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

  filterSelected(selected) {
    const totalSeletedPerUnit = Object.keys(selected).reduce((acc, key) => {
      acc[selected[key].name] = acc[selected[key].name] || 0;
      acc[selected[key].name] += selected[key].value;
      return acc;
    }, {});
    const newTotals = this.state.totals.map(totalRow =>
      Object.assign({}, totalRow)
    );
    Object.keys(totalSeletedPerUnit).forEach(unitName => {
      const row = newTotals.find(totalRow => totalRow.name === unitName);
      if (row) {
        row.value = totalSeletedPerUnit[unitName];
      }
    });

    // Object.keys(selected).forEach(id => {
    //   const selectedRow = selected[id];
    //   totalsAcc[id] = totalsAcc[id] || 0;
    //   totalsAcc[id] += selected[id].value;
    // });
    this.setState({ ...this.state, filterdTotals: newTotals });
    return newTotals;
  }

  getTotals() {
    if (Object.keys(this.state.filterdTotals) == 0) {
      return this.state.totals;
    }
    return this.state.filterdTotals;
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
            title={gridConfigs.financialUnitsPositions.title}
            headerRow={getHeadersAsRow("financialUnitsPositions")}
            filterSelected={this.filterSelected.bind(this)}
            headers={gridConfigs.financialUnitsPositions.headers}
            rows={this.state.rows}
          />
          <GeneralGrid
            key="financialUnitsPositionsSums"
            title={gridConfigs.financialUnitsPositionsSums.title}
            headerRow={getHeadersAsRow("financialUnitsPositionsSums")}
            headers={gridConfigs.financialUnitsPositionsSums.headers}
            rows={this.getTotals()}
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
