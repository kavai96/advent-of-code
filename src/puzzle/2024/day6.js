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

const findElementPosition = (map) => {
  const rowIndex = map.findIndex((row) =>
    row.some((direction) => directions.includes(direction))
  );

  const colIndex = map[rowIndex].findIndex((direction) =>
    directions.includes(direction)
  );

  return [rowIndex, colIndex];
};

const traverseMap = (map) => {
  const startingIndex = findElementPosition(map);

  let [i, j] = startingIndex;

  while (true) {
    const direction = map[i][j];
    const [di, dj] = directionIndexes.get(direction);
    const [nextI, nextJ] = [i + di, j + dj];
    const element = map[nextI]?.[nextJ];

    //Edge found
    if (!element) {
      map[i][j] = "X";
      break;
    }

    if (element === "#") {
      map[i][j] = getNextDirection(direction);
      continue;
    }

    map[i][j] = "X";
    [i, j] = [nextI, nextJ];
    map[i][j] = direction;
  }

  return map.flat().join("").match(/X/g).length;
};

const serializePosition = (direction, i, j) => `${direction},${i},${j}`;

const searchInfinite = (searchMap) => {
  const [startI, startJ] = findElementPosition(searchMap);
  let [i, j] = [startI, startJ];
  const visitedPositions = new Set();

  while (true) {
    const direction = searchMap[i][j];
    const [di, dj] = directionIndexes.get(direction);
    const [nextI, nextJ] = [i + di, j + dj];
    const element = searchMap[nextI]?.[nextJ];

    if (!element) break; //Edge reached

    if (element === "#") {
      const positionKey = serializePosition(direction, nextI, nextJ);

      if (visitedPositions.has(positionKey)) {
        return true;
      }

      visitedPositions.add(positionKey);
      searchMap[i][j] = getNextDirection(direction);
      continue;
    }

    [i, j] = [nextI, nextJ];
    searchMap[i][j] = direction;
  }
};

const countInfiniteRegions = (map) => {
  let infiniteCount = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ".") {
        const tempMap = map.map((row) => [...row]);
        tempMap[i][j] = "#";

        if (searchInfinite(tempMap)) {
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

  const mapForFirstPart = fileContent.map((row) => row.split(""));
  const mapForSecondPart = fileContent.map((row) => row.split(""));

  const part1 = traverseMap(mapForFirstPart);
  console.log("part1", part1);

  ///////////////////////////////////////// Part 2

  const part2 = countInfiniteRegions(mapForSecondPart);
  console.log("part2", part2);
};

module.exports = { day6 };
