const getFinancialUnitsPositions = (positions, finsancialUnits, rates) => {
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

const buildFinUnits = data => {
  data.finUnits = Object.keys(data.finUnits)
    .map(id => data.finUnits[id])
    .reduce((acc, unit) => {
      acc[unit.id] = unit;
      return acc;
    }, {});
};

module.exports = { getFinancialUnitsPositions, buildFinUnits };
