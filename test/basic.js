// basic tests
// https://www.node-tap.org/
var tap = require('tap');
var Grid = require('../index.js');

// constructor
var grid = new Grid(50);

tap.equal(grid.cellsize, 50, 'constructor: cellsize');

tap.type(grid.grid, 'Array');
tap.equal(grid.grid.length, 0, 'constructor: cells');

// add: unit -> { id: xxx, xPosition: n, yPosition: n }
var unit = {
  id: Math.random().toString(16).slice(2),
  xPosition: Math.floor(Math.random() * 100),
  yPosition: Math.floor(Math.random() * 100)
};
var x = Math.floor(unit.xPosition / 50);
var y = Math.floor(unit.yPosition / 50);

grid.add(unit);
tap.type(grid.grid[x][y], 'Array', 'cell is an array');
tap.ok(grid.grid[x][y].includes(unit), 'unit is in cell');

// remove
grid.remove(unit) // remove unit b
tap.notOk(grid.grid[x][y].includes(unit), 'unit removed from cell');

// move
grid.add(unit);

var dxPosition = Math.random() * 100;
var dyPosition = Math.random() * 100;
var dx = Math.floor(dxPosition / 50);
var dy = Math.floor(dyPosition / 50);

var moved = grid.move(unit, dxPosition, dyPosition);
tap.notOk(grid.grid[x][y].includes(unit), 'unit is not in old cell');
tap.ok(grid.grid[dx][dy].includes(unit), 'unit is in new cell')
tap.same(moved, Object.assign(unit, { xPosition: dxPosition, yPosition: dyPosition }));
