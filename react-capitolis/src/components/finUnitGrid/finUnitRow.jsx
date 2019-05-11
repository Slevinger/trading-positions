import React from "react";
import FinUnitGridBaseCell from "./finUnitGridCell/finUnitGridBaseCell";
import { headers } from "./grid-config";

// import "./finUnitRow.css";
// todo: import the grid defenitions order/captions/filters

export default class FinUnitRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { rowData } = this.props;

    return (
      <div
        onClick={this.onClick}
        className={`fin-unit grid-row ${
          this.state.expanded ? " selected" : ""
        }`}
      >
        {headers.map((colSettings, index) => {
          console.log(colSettings);
          return (
            <FinUnitGridBaseCell
              key={index}
              cellValue={rowData[colSettings.fieldName]}
            />
          );
        })}
      </div>
    );
  }
}
