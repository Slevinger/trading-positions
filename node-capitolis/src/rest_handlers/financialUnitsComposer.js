module.exports = getFinancialUnitsPositions = (
  positions,
  finsancialUnits,
  rates
) => {
  console.log("rates", rates);
  return positions.map(position => {
    const id = position.id;
    Object.assign(position, finsancialUnits[position.fuOriginId]);
    Object.assign(position, position.data);
    delete position.data;
    position.rate = rates[position.currency.ccy];
    position.id = id;
    return position;
  });
};
