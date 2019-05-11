const BASE = "EUR";

let rowsAsData;

export const headers = [
  {
    fieldName: "name",
    caption: "Financial Name",
    index: 0
  },
  {
    fieldName: "notionalValue",
    caption: "National Value",
    index: 1
  },
  {
    fieldName: "rate",
    caption: "Rate",
    index: 2
  },
  {
    fieldName: "ccy",
    caption: "Currency",
    index: 3
  },
  {
    fieldName: "value",
    caption: `Calculated Value in(${BASE})`,
    index: 4
  }
];

export const getHeadersAsRow = () => {
  rowsAsData =
    rowsAsData ||
    headers.reduce((acc, headerSettings) => {
      acc[headerSettings.fieldName] = headerSettings.caption;
      return acc;
    }, {});
  return rowsAsData;
};
