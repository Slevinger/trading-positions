let base = "USD";
let convertTo = "EUR";

export const gridConfigs = {
  financialUnitsPositions: {
    title: "Latest positions on financial unit",
    headers: [
      {
        fieldName: "name",
        caption: "Financial Unit Name"
      },
      {
        fieldName: "notionalValue",
        caption: `National Value`
      },
      {
        fieldName: "ccy",
        caption: "Currency"
      },
      {
        fieldName: "rate",
        caption: "Rate"
      },
      {
        fieldName: "value",
        caption: `Calculated Value in(${base})`
      }
    ]
  },
  financialUnitsPositionsSums: {
    title: "Total Sums Of financial units",
    headers: [
      {
        fieldName: "name",
        caption: "FU Name"
      },
      {
        fieldName: "value",
        caption: `Total value in (${base})`
      }
    ]
  }
};

export const getHeadersAsRow = gridName => {
  return gridConfigs[gridName].headers.reduce((acc, headerSettings) => {
    acc[headerSettings.fieldName] = headerSettings.caption;
    return acc;
  }, {});
};
