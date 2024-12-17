const { readFileAndCreateArray } = require("../../helper/readFile");
const { printGrid } = require("../../helper/printGrid");

const directions = new Map([
  ["-1-0", "^"],
  ["0-1", ">"],
  ["1-0", "v"],
  ["0--1", "<"],
]);

const findElementPosition = (grid) => {
  const rowIndex = grid.findIndex((row) => row.some((node) => node === "S"));

  const colIndex = grid[rowIndex].findIndex((node) => node === "S");

  return [rowIndex, colIndex];
};

const coordinates = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

const DIR_TO_MOVEMENT = {
  0: [-1, 0], // UP
  1: [0, 1], // RIGHT
  2: [1, 0], // DOWN
  3: [0, -1], // LEFT
};

const day16 = async () => {
  const filePath = "./src/input/2024/input16.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const grid = fileContent.map((row) => row.split(""));

  const visited = new Set();

  const [startI, startJ] = findElementPosition(grid);
  const queue = [[startI, startJ, 1, 1]];

  let dist = 0;
  let dirch = 0;

  let best = 99999999;

  const ptWiseMinScore = {};

  while (queue.length > 0) {
    const newQueue = [];
    const [x, y, score, direction] = queue.shift();

    const posKey = `${x},${y}`;
    const cacheKey = `${posKey},${direction}`;

    if (
      x < 0 ||
      y < 0 ||
      x >= grid.length ||
      y >= grid[0].length ||
      grid[x][y] === "#" ||
      ptWiseMinScore[cacheKey] < score
    ) {
      continue;
    }

    ptWiseMinScore[cacheKey] = score;

    if (grid[x][y] === "E") {
      console.log("HERE", score);
      continue;
    }

    const availableMoves = [
      direction,
      (direction + 1) % 4,
      (direction + 3) % 4,
    ];

    for (const move of availableMoves) {
      const [dx, dy] = DIR_TO_MOVEMENT[move];
      const [newX, newY] = [x + dx, y + dy];

      const nextScore = score + (direction === move ? 1 : 1001);
      queue.push([newX, newY, nextScore, move]);
    }
  }

  console.log("distance", dist);
  console.log("directionChange", dirch);
  console.log(dirch * 1000 + dist);
  console.log(best);

  //printGrid(grid);
};

module.exports = { day16 };
