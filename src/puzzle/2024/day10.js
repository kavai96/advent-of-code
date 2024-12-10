const { readFileAndCreateArray } = require("../../helper/readFile");

const coordinates = [
  [-1, 0], //up
  [1, 0], //down
  [0, 1], //right
  [0, -1], //left
];

const findRightPaths = (i, j, grid, pathTrackers) => {
  if (grid[i][j] === 9) {
    pathTrackers.uniqueTops.add(`${i}-${j}`);
    pathTrackers.topReached++;
    return;
  }

  coordinates.forEach(([x, y]) => {
    const checkingElement = grid[i + x]?.[j + y];

    if (checkingElement && checkingElement - grid[i][j] === 1) {
      findRightPaths(i + x, j + y, grid, pathTrackers);
    }
  });
};

const day10 = async () => {
  const filePath = "./src/input/2024/input10.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const grid = fileContent.map((row) =>
    row.split("").map((element) => Number(element))
  );

  let part1 = 0;
  let part2 = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
        continue;
      }

      const pathTrackers = {
        uniqueTops: new Set(), // For part1
        topReached: 0, // For part2
      };

      findRightPaths(i, j, grid, pathTrackers);

      part1 += pathTrackers.uniqueTops.size;
      part2 += pathTrackers.topReached;
    }
  }

  console.log("part1", part1);
  console.log("part2", part2);
};

module.exports = { day10 };
