import React from "react";

export default class FinUnitGridBaseCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-cell">
        <p>{this.props.cellValue}</p>
      </div>
    );
  }
}
