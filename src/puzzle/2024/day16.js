const { readFileAndCreateArray } = require("../../helper/readFile");

const findElementPosition = (grid) => {
  const rowIndex = grid.findIndex((row) => row.some((node) => node === "S"));

  const colIndex = grid[rowIndex].findIndex((node) => node === "S");

  return [rowIndex, colIndex];
};

const coordinates = {
  0: [-1, 0], // up
  1: [0, 1], // right
  2: [1, 0], // down
  3: [0, -1], // left
};

function findAllPaths(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const allPaths = [];
  const path = [];

  let lowestScore = Infinity;

  const scoreMap = new Map();

  function isValidMove(x, y, visited, direction, score, scoreMap) {
    const key = `${x}-${y}-${direction}`;

    return (
      x >= 0 &&
      y >= 0 &&
      x < rows &&
      y < cols &&
      maze[x][y] !== "#" &&
      !visited.has(`${x}-${y}`) &&
      (!scoreMap.get(key) || score <= scoreMap.get(key))
    );
  }

  function traverseMaze(x, y, visited, score, direction) {
    path.push([x, y]);
    visited.add(`${x}-${y}`);
    const key = `${x}-${y}-${direction}`;

    scoreMap.set(key, score);

    if (maze[x][y] === "E") {
      if (score < lowestScore) {
        lowestScore = score;
      }

      allPaths.push([score, ...path]);
    } else {
      const availableDirections = [
        direction,
        (direction + 1) % 4,
        (direction + 3) % 4,
      ];

      for (const availableDirecion of availableDirections) {
        const [dx, dy] = coordinates[availableDirecion];
        const newX = x + dx;
        const newY = y + dy;

        const nextScore = score + (direction === availableDirecion ? 1 : 1001);

        if (
          isValidMove(
            newX,
            newY,
            visited,
            availableDirecion,
            nextScore,
            scoreMap
          )
        ) {
          traverseMaze(newX, newY, visited, nextScore, availableDirecion);
        }
      }
    }

    path.pop();
    visited.delete(`${x}-${y}`);
  }

  const [startI, startJ] = findElementPosition(maze);
  const visited = new Set();
  traverseMaze(startI, startJ, visited, 0, 1);

  const bestPaths = allPaths.filter((path) => {
    const [score] = path;
    return score === lowestScore;
  });

  return [lowestScore, bestPaths];
}

const day16 = async () => {
  const filePath = "./src/input/2024/input16.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const maze = fileContent.map((row) => row.split(""));

  const [lowestScore, paths] = findAllPaths(maze);

  const bestPathNodes = new Set();

  paths.forEach((path) => {
    const [_, ...rest] = path;

    rest.forEach(([x, y]) => {
      bestPathNodes.add(`${x}-${y}`);
    });
  });

  console.log("part1", lowestScore);
  console.log("part2", bestPathNodes.size);
};

module.exports = { day16 };
