const { cloneDeep } = require("lodash");
const { readFileAndCreateArray } = require("../../helper/readFile");

const directions = ["^", ">", "v", "<"];

const directionIndexes = new Map([
  ["^", [-1, 0]],
  [">", [0, 1]],
  ["v", [1, 0]],
  ["<", [0, -1]],
]);

const getNextDirection = (currentDirection) =>
  directions[(directions.indexOf(currentDirection) + 1) % directions.length];

const findElementPosition = (grid) => {
  const rowIndex = grid.findIndex((row) =>
    row.some((direction) => directions.includes(direction))
  );

  const colIndex = grid[rowIndex].findIndex((direction) =>
    directions.includes(direction)
  );

  return [rowIndex, colIndex];
};

const traverseGrid = (grid) => {
  const startingIndex = findElementPosition(grid);

  let [i, j] = startingIndex;

  while (true) {
    const direction = grid[i][j];
    const [di, dj] = directionIndexes.get(direction);
    const [nextI, nextJ] = [i + di, j + dj];
    const element = grid[nextI]?.[nextJ];

    //Edge found
    if (!element) {
      grid[i][j] = "X";
      break;
    }

    if (element === "#") {
      grid[i][j] = getNextDirection(direction);
      continue;
    }

    grid[i][j] = "X";
    [i, j] = [nextI, nextJ];
    grid[i][j] = direction;
  }

  return grid.flat().join("").match(/X/g).length;
};

const serializePosition = (direction, i, j) => `${direction},${i},${j}`;

const searchInfinite = (searchGrid) => {
  const [startI, startJ] = findElementPosition(searchGrid);
  let [i, j] = [startI, startJ];
  const visitedPositions = new Set();

  while (true) {
    const direction = searchGrid[i][j];
    const [di, dj] = directionIndexes.get(direction);
    const [nextI, nextJ] = [i + di, j + dj];
    const element = searchGrid[nextI]?.[nextJ];

    if (!element) break; //Edge reached

    if (element === "#") {
      const positionKey = serializePosition(direction, nextI, nextJ);

      if (visitedPositions.has(positionKey)) {
        return true;
      }

      visitedPositions.add(positionKey);
      searchGrid[i][j] = getNextDirection(direction);
      continue;
    }

    [i, j] = [nextI, nextJ];
    searchGrid[i][j] = direction;
  }
};

const countInfiniteRegions = (grid) => {
  let infiniteCount = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ".") {
        const tempGrid = grid.map((row) => [...row]);
        tempGrid[i][j] = "#";

        if (searchInfinite(tempGrid)) {
          infiniteCount++;
        }
      }
    }
  }

  return infiniteCount;
};

const day6 = async () => {
  const filePath = "./src/input/2024/input6.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const gridForFirstPart = fileContent.map((row) => row.split(""));
  const gridForSecondPart = fileContent.map((row) => row.split(""));

  const part1 = traverseGrid(gridForFirstPart);
  console.log("part1", part1);

  ///////////////////////////////////////// Part 2

  const part2 = countInfiniteRegions(gridForSecondPart);
  console.log("part2", part2);
};

module.exports = { day6 };
