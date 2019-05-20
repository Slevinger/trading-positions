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
        <div className="grid-title">Title</div>
        <GridToolBox data={rows} headers={headerRow} />
        <GridRow
          className="grid-header"
          headers={headers}
          rowData={headerRow}
          onMouseOut={this.hideTitle.bind(this)}
          onMouseOver={this.showTitle.bind(this)}
        />
      </div>
    );
  }

  showTitle(e) {
    this.changeVisibilityOfSiblingByClassNamw(e, "grid-title", "show");
  }
  hideTitle(e) {
    this.changeVisibilityOfSiblingByClassNamw(e, "grid-title", "hide");
  }
  changeVisibilityOfSiblingByClassNamw(e, siblingClassName, display) {
    const title = e.currentTarget.parentElement.getElementsByClassName(
      siblingClassName
    )[0];
    switch (display) {
      case "show": {
        title.classList.add("show");
        title.classList.remove("hide");
        break;
      }
      default: {
        title.classList.add("hide");
        title.classList.remove("show");
        break;
      }
    }
    console.log(title);
  }

  render() {
    const { rows, headers } = this.props;
    return (
      <div className="financial-units-grid">
        {this.renderHeadersNames()}
        {rows.length > 0 &&
          rows.map((position, index) => {
            const { id } = position;
            return (
              <GridRow
                className="value-row"
                key={id + "_" + index}
                headers={headers}
                rowData={rows[index]}
              />
            );
          })}
      </div>
    );
  }
}
