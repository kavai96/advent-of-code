const { readFileAndCreateArray } = require("../../helper/readFile");

const getRight = (array, i, j) => {
  return (
    array[i]?.[j] + array[i]?.[j + 1] + array[i]?.[j + 2] + array[i]?.[j + 3]
  );
};

const getLeft = (array, i, j) => {
  return (
    array[i]?.[j] + array[i]?.[j - 1] + array[i]?.[j - 2] + array[i]?.[j - 3]
  );
};

const getUp = (array, i, j) => {
  return (
    array[i]?.[j] + array[i - 1]?.[j] + array[i - 2]?.[j] + array[i - 3]?.[j]
  );
};

const getDown = (array, i, j) => {
  return (
    array[i]?.[j] + array[i + 1]?.[j] + array[i + 2]?.[j] + array[i + 3]?.[j]
  );
};

const getDigUpLeft = (array, i, j) => {
  return (
    array[i]?.[j] +
    array[i - 1]?.[j - 1] +
    array[i - 2]?.[j - 2] +
    array[i - 3]?.[j - 3]
  );
};

const getDigUpRight = (array, i, j) => {
  return (
    array[i]?.[j] +
    array[i - 1]?.[j + 1] +
    array[i - 2]?.[j + 2] +
    array[i - 3]?.[j + 3]
  );
};

const getDigDownRight = (array, i, j) => {
  return (
    array[i]?.[j] +
    array[i + 1]?.[j + 1] +
    array[i + 2]?.[j + 2] +
    array[i + 3]?.[j + 3]
  );
};

const getDigDownLeft = (array, i, j) => {
  return (
    array[i]?.[j] +
    array[i + 1]?.[j - 1] +
    array[i + 2]?.[j - 2] +
    array[i + 3]?.[j - 3]
  );
};

const part1Search = () => [
  getRight,
  getLeft,
  getUp,
  getDown,
  getDigUpLeft,
  getDigUpRight,
  getDigDownRight,
  getDigDownLeft,
];

const left = (array, i, j) => {
  if (array[i][j] !== "A") return false;

  return (
    array[i - 1]?.[j - 1] === "M" &&
    array[i - 1]?.[j + 1] === "S" &&
    array[i + 1]?.[j - 1] === "M" &&
    array[i + 1]?.[j + 1] === "S"
  );
};

const top = (array, i, j) => {
  if (array[i][j] !== "A") return false;

  return (
    array[i - 1]?.[j - 1] === "M" &&
    array[i - 1]?.[j + 1] === "M" &&
    array[i + 1]?.[j - 1] === "S" &&
    array[i + 1]?.[j + 1] === "S"
  );
};

const right = (array, i, j) => {
  if (array[i][j] !== "A") return false;

  return (
    array[i - 1]?.[j - 1] === "S" &&
    array[i - 1]?.[j + 1] === "M" &&
    array[i + 1]?.[j - 1] === "S" &&
    array[i + 1]?.[j + 1] === "M"
  );
};

const bottom = (array, i, j) => {
  if (array[i][j] !== "A") return false;

  return (
    array[i - 1]?.[j - 1] === "S" &&
    array[i - 1]?.[j + 1] === "S" &&
    array[i + 1]?.[j - 1] === "M" &&
    array[i + 1]?.[j + 1] === "M"
  );
};

const part2Search = () => [left, top, right, bottom];

const day4 = async () => {
  const filePath = "./src/input/2024/input4.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const letters = fileContent.map((row) => row.split(""));

  let part1 = 0;
  let part2 = 0;

  letters.forEach((row, i) => {
    row.forEach((_, j) => {
      part1Search().forEach((search) => {
        if (search(letters, i, j) === "XMAS") {
          part1++;
        }
      });

      part2Search().forEach((search) => {
        if (search(letters, i, j)) {
          part2++;
        }
      });
    });
  });

  console.log(part1, part2);
};

module.exports = { day4 };
