import React from "react";
import GridRow from "./gridRow";
import "./generalGrid.css";

import GridToolBox from "./gridToolBox/gridToolBox";

export default class GeneralGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedRows: {} };
  }

  toggleSelectAll(e) {
    if (e.target.closest(".grid-header")) {
      alert("boyya");
    }
  }

  selectRow(e) {
    const id = e.currentTarget.id;
    let selectedRows = { ...this.state.selectedRows };
    if (selectedRows[id]) {
      delete selectedRows[id];
    } else {
      selectedRows[e.currentTarget.id] = e.currentTarget;
    }
    this.setState({ ...this.state, selectedRows });
  }

  renderHeadersNames() {
    const { rows, headers, headerRow, title } = this.props;
    return (
      <div onClick={this.toggleSelectAll.bind(this)}>
        <div className="grid-title">{title}</div>
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
                rowid={id}
                className="value-row"
                key={id + "_" + index}
                onClick={this.selectRow.bind(this)}
                selected={this.state.selectedRows[id] ? true : false}
                headers={headers}
                rowData={rows[index]}
              />
            );
          })}
      </div>
    );
  }
}
