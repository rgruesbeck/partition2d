// helper tests
var tap = require('tap');
var Grid = require('../index.js');

// constructor
var grid = new Grid(50);

var unit = {
  id: Math.random().toString(16).slice(2),
  xPosition: Math.random() * 100,
  yPosition: Math.random() * 100
};
var x = Math.floor(unit.xPosition / 50);
var y = Math.floor(unit.yPosition / 50);

// getAxis
tap.equal(grid.getAxis(unit.xPosition), x);
tap.equal(grid.getAxis(unit.yPosition), y);

// getUnitCell
grid.add(unit);
tap.same(grid.getUnitCell(unit), [unit]);
