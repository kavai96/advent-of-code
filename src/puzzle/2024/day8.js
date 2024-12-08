const { readFileAndCreateArray } = require("../../helper/readFile");

const isValidPosition = (x, y, grid) => {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
};

const day8 = async () => {
  const filePath = "./src/input/2024/input8.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const part1UniquePositions = new Set();
  const part2UniquePositions = new Set();

  const grid = fileContent.map((row) => row.split(""));

  grid.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === ".") {
        return;
      }

      for (let x = i; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          if (x === i && y === j) continue;

          if (grid[x][y] === item) {
            const diffRow = x - i;
            const diffCol = y - j;

            const firstPartPositions = [
              [i - diffRow, j - diffCol],
              [x + diffRow, y + diffCol],
            ];

            firstPartPositions.forEach(([rowPosition, colPosition]) => {
              if (isValidPosition(rowPosition, colPosition, grid)) {
                part1UniquePositions.add(`${rowPosition}-${colPosition}`);
              }
            });

            ////////////////////////////////// Part 2

            const secondPartPositions = [
              [i, j],
              [x, y],
            ];

            secondPartPositions.forEach(([rowPosition, colPosition], i) => {
              if (i === 0) {
                while (isValidPosition(rowPosition, colPosition, grid)) {
                  part2UniquePositions.add(`${rowPosition}-${colPosition}`);
                  rowPosition -= diffRow;
                  colPosition -= diffCol;
                }
              }

              if (i === 1) {
                while (isValidPosition(rowPosition, colPosition, grid)) {
                  part2UniquePositions.add(`${rowPosition}-${colPosition}`);
                  rowPosition += diffRow;
                  colPosition += diffCol;
                }
              }
            });
          }
        }
      }
    });
  });

  console.log("part1", part1UniquePositions.size);
  console.log("part2", part2UniquePositions.size);
};

module.exports = { day8 };
