import React from "react";
import GridBaseCell from "./gridCell/gridBaseCell";

// import "./finUnitRow.css";
// todo: import the grid defenitions order/captions/filters

export default class GridRow extends React.PureComponent {
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
    const { rowData, className, headers } = this.props;

    return (
      <div
        onClick={this.onClick}
        className={`fin-unit grid-row ${
          this.state.expanded ? " selected" : ""
        } ${className}`}
      >
        {headers.map((colSettings, index) => {
          console.log(colSettings);
          return (
            <GridBaseCell
              key={index}
              cellValue={rowData[colSettings.fieldName]}
            />
          );
        })}
      </div>
    );
  }
}
