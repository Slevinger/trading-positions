const BASE = "EUR";

export const headers = {
  financialUnitsPoisions: [
    {
      fieldName: "name",
      caption: "Financial Name"
    },
    {
      fieldName: "value",
      caption: `Total Value in (${BASE})`
    },
    {
      fieldName: "rate",
      caption: "Rate"
    },
    {
      fieldName: "ccy",
      caption: "Currency"
    },
    {
      fieldName: "value",
      caption: `Calculated Value in(${BASE})`
    }
  ],
  financialUnitsPoisionsSums: [
    {
      fieldName: "name",
      caption: "FU Name"
    },
    {
      fieldName: "value",
      caption: `Total value in (${BASE})`
    }
  ]
};

export const getHeadersAsRow = gridName => {
  return headers[gridName].reduce((acc, headerSettings) => {
    acc[headerSettings.fieldName] = headerSettings.caption;
    return acc;
  }, {});
};
