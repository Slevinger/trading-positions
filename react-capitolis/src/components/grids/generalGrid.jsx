import React from "react";
import GridRow from "./gridRow";
import "./generalGrid.css";

export default class GeneralGrid extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderHeadersNames() {
    return (
      <GridRow
        className="grid-header"
        headers={this.props.headers}
        rowData={this.props.headerRow}
      />
    );
  }

  render() {
    const { rows, headers } = this.props;
    return (
      <div className="financial-units-grid">
        {this.renderHeadersNames()}
        {rows.length > 0 &&
          rows.map((position, index) => {
            const { id } = position;
            return <GridRow key={id} headers={headers} rowData={rows[index]} />;
          })}
      </div>
    );
  }
}
