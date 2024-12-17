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
  const rowIndex = grid.findIndex((row) => row.some((node) => node === "@"));

  const colIndex = grid[rowIndex].findIndex((node) => node === "@");

  return [rowIndex, colIndex];
};

const generateResult = (grid, moves, part2 = false) => {
  if (part2) {
    const modifiedGrid = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const node = grid[i][j];

        if (!modifiedGrid[i]) {
          modifiedGrid[i] = [];
        }

        if (node === "#") {
          modifiedGrid[i].push(...["#", "#"]);
        }

        if (node === "O") {
          modifiedGrid[i].push(...["[", "]"]);
        }

        if (node === ".") {
          modifiedGrid[i].push(...[".", "."]);
        }

        if (node === "@") {
          modifiedGrid[i].push(...["@", "."]);
        }
      }
    }

    grid = modifiedGrid;
  }

  while (moves.length > 0) {
    const move = moves.shift();

    const [startI, startJ] = findElementPosition(grid);
    const [dx, dy] = directionIndexes.get(move);

    const queue = [[startI, startJ]];

    let shouldMove = true;

    const visited = new Set();

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (visited.has(`${x}-${y}`)) {
        continue;
      }

      visited.add(`${x}-${y}`);
      const newX = x + dx;
      const newY = y + dy;

      if (grid[newX][newY] === "#") {
        shouldMove = false;
        break;
      }

      if (grid[newX][newY] === "O") {
        queue.push([newX, newY]);
      }

      if (grid[newX][newY] === "[") {
        queue.push([newX, newY]);

        if (grid[newX][newY + 1] === "]") {
          queue.push([newX, newY + 1]);
        }
      }

      if (grid[newX][newY] === "]") {
        queue.push([newX, newY]);

        if (grid[newX][newY - 1] === "[") {
          queue.push([newX, newY - 1]);
        }
      }
    }

    if (shouldMove) {
      const parsedVisited = Array.from(visited).map((item) =>
        item.split("-").map(Number)
      );

      if (move === "^" || move === "<") {
        parsedVisited.sort((a, b) => {
          if (a[0] !== b[0]) {
            return a[0] - b[0];
          }

          return a[1] - b[1];
        });
      }

      if (move === "v" || move === ">") {
        parsedVisited.sort((a, b) => {
          if (a[0] !== b[0]) {
            return b[0] - a[0];
          }

          return b[1] - a[1];
        });
      }

      parsedVisited.forEach((node) => {
        const [x, y] = node;

        if (grid[x + dx][y + dy] === ".") {
          grid[x + dx][y + dy] = grid[x][y];
          grid[x][y] = ".";
        }
      });

      grid[startI][startJ] = ".";
    }
  }

  let coordinateSum = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = grid[i][j];

      if (node === "[" || node === "O") {
        coordinateSum += i * 100 + j;
      }
    }
  }

  return coordinateSum;
};

const day15 = async () => {
  const filePath = "./src/input/2024/input15.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let grid = [];
  const moves = [];

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

  const part1 = generateResult(grid, moves);
  //const part2 = generateResult(grid, moves, true);

  console.log("part1", part1);
  //console.log("part2", part2);
};

module.exports = { day15 };
