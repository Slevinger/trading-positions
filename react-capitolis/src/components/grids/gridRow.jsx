import React from "react";
import GridBaseCell from "./gridCell/gridBaseCell";

export default class GridRow extends React.PureComponent {
  constructor(props) {
    super(props);
    const { rowid } = props;
    this.state = {
      expanded: false,
      rowid
    };
    this.onClick = (this.props.onClick || this.onClick).bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      ...prevState,
      expanded: !prevState.expanded
    }));
  }

  render() {
    const {
      rowData,
      className,
      headers,
      onMouseOver,
      onMouseOut,
      rowid,
      selected
    } = this.props;
    const selectRow = this.props.onClick || this.onClick;
    return (
      <div
        id={rowid}
        onClick={selectRow}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        className={`fin-unit grid-row ${
          selected ? " selected" : ""
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
