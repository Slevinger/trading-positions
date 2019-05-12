const buildFinUnits = data => {
  data.finUnits = Object.keys(data.finUnits)
    .map(id => data.finUnits[id])
    .reduce((acc, unit) => {
      acc[unit.id] = unit;
      return acc;
    }, {});
};

module.exports = {
  buildFinUnits
};
