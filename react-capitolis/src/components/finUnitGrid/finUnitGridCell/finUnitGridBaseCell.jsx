import React from "react";

export default class FinUnitGridBaseCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid-cell">
        <p>{JSON.stringify(this.props.cellValue)}</p>
      </div>
    );
  }
}
