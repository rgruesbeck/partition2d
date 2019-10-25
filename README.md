# Partition 2D
Simple spacial partition for 2D browser games.

## Install
```sh
npm install --save partition2d
```

## Run Tests
```sh
npm run test
```

## Use

### Create
```js 
import Grid from 'partition2d';

// create new spacial grid with 100px cells
const grid = new Grid(100);
```

### Add Units
```js 
const grid = new Grid(100);

let unit = {
  id: Math.random().toString(16).slice(2),
  xPosition: 25,
  yPosition: 25,
  radius: 5
};

// add a new unit to the grid
grid.add(unit)
```

### Remove Units
```js 
// remove unit from the grid
grid.remove(unit)
```

### Move Units
```js 
// move an object in the grid
// move(<unit>, x, y)
grid.move(unit, 10, 10)
```

### Check Unit for collisions
```js 
const circleToCircle = function(a, b) {
  const vx = a.xPosition - b.xPosition;
  const vy = a.yPosition - b.yPosition;
  const length = Math.sqrt(vx * vx + vy * vy);
  if(length < a.radius + b.radius){
    return true;
  }
  return false;
};

// check the local space for collisions with a unit using a circle-to-circle collision function
grid.checkCollisions(unit, circleToCircle)
```

### Search Unit's local space.
```js 
grid.searchNeighborhood(unit, (neighbor) => {
    // neighbor filter function
    return true;
})
```