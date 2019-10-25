// collisions tests
var tap = require('tap');
var Grid = require('../index.js');

var grid = new Grid(50);

var unit = {
  id: Math.random().toString(16).slice(2),
  xPosition: 25,
  yPosition: 25,
  radius: 5
};

var unit2 = {
  id: Math.random().toString(16).slice(2),
  xPosition: 30,
  yPosition: 30,
  radius: 5
};

var unit3 = {
  id: Math.random().toString(16).slice(2),
  xPosition: 10,
  yPosition: 10,
  radius: 2
};

var x = Math.floor(unit.xPosition / 50);
var y = Math.floor(unit.yPosition / 50);

var circleToCircle = function(a, b) {
  const vx = a.xPosition - b.xPosition;
  const vy = a.yPosition - b.yPosition;
  const length = Math.sqrt(vx * vx + vy * vy);
  if(length < a.radius + b.radius){
    return true;
  }
  return false;
};

grid.add(unit);
grid.add(unit2);
grid.add(unit3);

// detects collision in cell within radius
tap.same(grid.checkCollisions(unit, circleToCircle), [unit2]);
tap.same(grid.checkCollisions(unit3, circleToCircle), []);