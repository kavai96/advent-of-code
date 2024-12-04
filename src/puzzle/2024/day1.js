const { readFileAndCreateArray } = require("../../helper/readFile");

const getSimilarity = (number, numberArray) => {
  const similarityCount = numberArray.reduce((init, actual) => {
    if (actual === number) {
      init += 1;
    }

    return init;
  }, 0);

  return similarityCount;
};

const day1 = async () => {
  const filePath = "./src/input/2024/input1.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const leftColumn = [];
  const rightColumn = [];

  fileContent.forEach((item) => {
    const [left, right] = item.split(/\s+/).map(Number);

    leftColumn.push(left);
    rightColumn.push(right);
  });

  leftColumn.sort((a, b) => a - b);
  rightColumn.sort((a, b) => a - b);

  const part1 = leftColumn.reduce((init, actual, index) => {
    init += Math.abs(actual - rightColumn[index]);
    return init;
  }, 0);

  console.log("First part", part1);

  ///////////////////////////////////////////////////// Part 2

  const part2 = leftColumn.reduce((init, actual) => {
    init += actual * getSimilarity(actual, rightColumn);

    return init;
  }, 0);

  console.log("Second part", part2);
};

module.exports = { day1 };
