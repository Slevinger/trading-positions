let base = "USD";
let convertTo = "EUR";

export const headers = {
  financialUnitsPositions: [
    {
      fieldName: "name",
      caption: "Financial Name"
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
  ],
  financialUnitsPositionsSums: [
    {
      fieldName: "name",
      caption: "FU Name"
    },
    {
      fieldName: "value",
      caption: `Total value in (${base})`
    }
  ]
};

export const getHeadersAsRow = gridName => {
  return headers[gridName].reduce((acc, headerSettings) => {
    acc[headerSettings.fieldName] = headerSettings.caption;
    return acc;
  }, {});
};
