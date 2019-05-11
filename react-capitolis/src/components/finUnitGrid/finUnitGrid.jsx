import axios from "axios";
import React from "react";
import FinUnitRow from "./finUnitRow";
import { getHeadersAsRow, headers } from "./grid-config";

import "./finUnitGrid.css";

export default class FinUnitsGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8080/financial_unists_positions").then(res => {
      console.log("axios");
      this.setPositionsFromData(res.data);
    });
  }

  setPositionsFromData(data) {
    const rows = data.map(fuPosition => {
      const row = { ...fuPosition.currency };
      // console.log(option);
      row.name = fuPosition.name;
      row.rate = fuPosition.rate;
      row.id = fuPosition.id;
      row.value = row.rate * row.notionalValue;
      return row;
    });
    // console.log(rows);

    this.setState({ rows });
  }

  renderHeadersNames() {
    return (
      <FinUnitRow
        className="grid-header"
        headers={headers}
        rowData={getHeadersAsRow()}
      />
    );
  }

  render() {
    const { rows } = this.state;
    console.log("positions", rows);

    return (
      <div className="financial-units-grid">
        {this.renderHeadersNames()}
        {rows.map((position, index) => {
          const { id } = position;
          return (
            <FinUnitRow key={id} headers={headers} rowData={rows[index]} />
          );
        })}
      </div>
    );
  }
}
