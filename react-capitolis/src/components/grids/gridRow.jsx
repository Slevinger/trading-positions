import React from "react";
import GridBaseCell from "./gridCell/gridBaseCell";

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
      ...prevState,
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { rowData, className, headers, onMouseOver, onMouseOut } = this.props;

    return (
      <div
        onClick={this.onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={`fin-unit grid-row ${
          this.state.expanded ? " selected" : ""
        } ${className}`}
      >
        {headers.map((colSettings, index) => {
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
