class Grid {
  constructor(cellsize) {
    this.grid =  [];
    this.cellsize = cellsize;
  }

  // add unit to grid
  add(unit) {
    let x = this.getAxis(unit.xPosition);
    let y = this.getAxis(unit.yPosition);

    // add unit
    this.allocate(x, y);
    this.grid[x][y].push(unit);
  }

  // remove unit from grid
  remove(unit) {
    let x = this.getAxis(unit.xPosition);
    let y = this.getAxis(unit.yPosition);

    // remove unit
    let idx = this.getCell(x, y)
        .map(u => u.id).indexOf(unit.id);
    if (idx >= 0) {
      this.grid[x][y].splice(idx, 1);
    }
  }

  // move unit to another cell
  move(unit, x, y) {
    // remove unit from current cell
    this.remove(unit);

    // update unit position
    let newUnit = Object.assign(unit, {
      xPosition: x,
      yPosition: y
    });

    this.add(newUnit);
    return newUnit;
  }

  // find collisions with a unit
  checkCollisions(unit) {
    // check neighborhood for collisions
    return this.searchNeighborhood(unit, (u) => {
      return u.id !== unit.id && this.isCollision(unit, u);
    });
  }

  // helpers
  searchNeighborhood(unit, filter) {
    // check home cell and neighboring cells
    return [
      { x: 0, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
      { x: -1, y: -1 }
    ].map((cell) => {
      return this.getUnitCell(unit, cell.x, cell.y)
        .filter((u) => {
          // filter by callback
          return filter(u);
        });
    }).reduce((flatten, arr) => {
      return [...flatten, ...arr];
    }, []);
  }

  isCollision(a, b){
    const vx = a.xPosition - b.xPosition;
    const vy = a.yPosition - b.yPosition;
    const length = Math.sqrt(vx * vx + vy * vy);
    if(length < a.radius + b.radius){
      return true;
    }
    return false;
  }

  getUnitCell(unit, vx, vy) {
    let wx = vx || 0;
    let wy = vy || 0;
    let x = this.getAxis(unit.xPosition) + wx;
    let y = this.getAxis(unit.yPosition) + wy;
    return this.getCell(x, y);
  }

  getCell(x, y) {
    this.allocate(x, y);
    return this.grid[x][y];
  }

  getAxis(n) {
    return Math.floor(n / this.cellsize);
  }

  allocate(x, y) {
    // allocate un-allocated locations
    if (typeof this.grid[x] === 'undefined') { this.grid[x] = []; }
    if (typeof this.grid[x][y] === 'undefined') { this.grid[x][y] = []; }
  }
}

module.exports = Grid;
