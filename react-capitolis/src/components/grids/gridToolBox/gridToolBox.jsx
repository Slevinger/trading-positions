import React from "react";
import "./gridToolBox.css";

export default class GridToolBox extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  exportData() {
    const data = []
      .concat(this.props.headers)
      .concat(this.props.data)
      .map(obj => {
        return Object.values(obj);
      });
    let csvContent =
      "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  render() {
    return (
      <div className="grid-toolbox">
        <img
          className="icon"
          title="Export data to CSV"
          onClick={this.exportData.bind(this)}
          src="https://img.icons8.com/ios/50/000000/export-csv-filled.png"
        />
      </div>
    );
  }
}
