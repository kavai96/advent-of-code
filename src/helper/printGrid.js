const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
};

module.exports = { printGrid };
