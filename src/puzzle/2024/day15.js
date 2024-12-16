const { readFileAndCreateArray } = require("../../helper/readFile");

const print = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
};

const directionIndexes = new Map([
  ["^", [-1, 0]],
  [">", [0, 1]],
  ["v", [1, 0]],
  ["<", [0, -1]],
]);

const findElementPosition = (grid) => {
  const rowIndex = grid.findIndex((row) =>
    row.some((direction) => direction === "@")
  );

  const colIndex = grid[rowIndex].findIndex((direction) => direction === "@");

  return [rowIndex, colIndex];
};

const day15 = async () => {
  const filePath = "./src/input/2024/input15.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let grid = [];
  let moves = [];

  let split = false;
  fileContent.forEach((row) => {
    if (row.trim() === "") {
      split = true;
      return;
    }

    if (!split) {
      grid.push(row.split(""));
    }

    if (split) {
      moves.push(...row.split(""));
    }
  });

  while (moves.length > 0) {
    const move = moves.shift();

    const [startI, startJ] = findElementPosition(grid);
    const [dx, dy] = directionIndexes.get(move);

    const queue = [[startI, startJ]];

    let shouldMove = false;

    while (true) {
      const [x, y] = queue[queue.length - 1];
      const newX = x + dx;
      const newY = y + dy;

      if (grid[newX][newY] === "#") {
        break;
      }

      if (grid[newX][newY] === ".") {
        shouldMove = true;
        break;
      }

      queue.push([newX, newY]);
    }

    if (shouldMove) {
      queue.forEach((node, index) => {
        if (index === 0) {
          const [x, y] = node;
          grid[x + dx][y + dy] = "@";
        }
        if (index > 0) {
          const [x, y] = node;
          grid[x + dx][y + dy] = "O";
        }
      });

      grid[startI][startJ] = ".";
    }
  }

  let part1 = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];

      if (node === "O") {
        part1 += i * 100 + j;
      }
    }
  }

  console.log("part1", part1);
};

module.exports = { day15 };
