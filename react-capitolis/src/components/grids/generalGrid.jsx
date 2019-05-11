import React from "react";
import GridRow from "./gridRow";
import "./generalGrid.css";
import GridToolBox from "./gridToolBox/gridToolBox";

export default class GeneralGrid extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  renderHeadersNames() {
    const { rows, headers, headerRow } = this.props;
    return (
      <div>
        <GridToolBox data={rows} headers={headerRow} />
        <GridRow
          className="grid-header"
          headers={headers}
          rowData={headerRow}
        />
      </div>
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
