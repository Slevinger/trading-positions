import React from "react";

export default class FinUnitGridBaseCell extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { cellValue } = this.props;
    return (
      <div className="grid-cell">
        <p>
          {typeof cellValue == "number"
            ? cellValue.toLocaleString("en-US")
            : cellValue}
        </p>
      </div>
    );
  }
}
