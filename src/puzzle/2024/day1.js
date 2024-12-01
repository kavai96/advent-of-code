const { readFileAndCreateArray } = require("../../helper/readFile");

function getSimilarity(number, numberArray) {
  const similarityCount = numberArray.reduce((init, actual) => {
    if (actual === number) {
      init += 1;
    }

    return init;
  }, 0);

  return similarityCount;
}

async function day1() {
  const filePath = "./src/input/2024/input1.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let leftColumn = [];
  let rightColumn = [];

  fileContent.forEach((item) => {
    const numbers = item.split(/\s+/);
    const [left, right] = numbers.map(Number);

    leftColumn.push(left);
    rightColumn.push(right);
  });

  leftColumn.sort((a, b) => a - b);
  rightColumn.sort((a, b) => a - b);

  const result1 = leftColumn.reduce((init, actual, index) => {
    init += Math.abs(actual - rightColumn[index]);
    return init;
  }, 0);

  console.log("First part", result1);

  /////////////////////////////////////////////////////

  let result2 = 0;

  leftColumn.forEach((number) => {
    result2 += number * getSimilarity(number, rightColumn);
  });

  console.log("Second part", result2);
}

module.exports = { day1 };
