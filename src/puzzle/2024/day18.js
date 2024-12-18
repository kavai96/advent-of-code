const { readFileAndCreateArray } = require("../../helper/readFile");

const directions = [
  [-1, 0], //up
  [0, 1], //right
  [1, 0], //down
  [0, -1], //left
];

const day18 = async () => {
  const filePath = "./src/input/2024/input18.txt";
  const fileContent = await readFileAndCreateArray(filePath);
  const size = 71;
  const grid = Array.from({ length: size }, () => Array(size).fill("."));
  const coordinates = fileContent.map((row) => row.split(",").map(Number));

  for (let visit = 0; visit < coordinates.length; visit++) {
    const [j, i] = coordinates[visit];

    grid[i][j] = "#";
    let blocked = true;

    const visited = Array.from({ length: size }, () => Array(size).fill(false));

    const queue = [[0, 0, 0]];

    while (queue.length > 0) {
      const [x, y, steps] = queue.shift();

      if (visited[x][y]) continue;

      if (x === size - 1 && y === size - 1) {
        if (visit === 1023) {
          console.log("part1", steps);
        }

        blocked = false;
        break;
      }

      visited[x][y] = true;

      for (const [dx, dy] of directions) {
        const [newX, newY] = [x + dx, y + dy];

        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < size &&
          newY < size &&
          !visited[newX][newY] &&
          grid[newX][newY] === "."
        ) {
          queue.push([newX, newY, steps + 1]);
        }
      }
    }

    if (blocked) {
      console.log("part2", `${j},${i}`);
      return;
    }
  }
};

module.exports = { day18 };
