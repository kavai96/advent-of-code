const { readFileAndCreateArray } = require("../../helper/readFile");

const matchForMultiply = /mul\((\d+),(\d+)\)/g;

const blockedParts = /don't\(\).*?do\(\)/g;

function multiplyValues(numbers) {
  return numbers.reduce((init, actual) => {
    init += actual.firstNumber * actual.secondNumber;
    return init;
  }, 0);
}

function extractValues(commands) {
  return commands.map((match) => ({
    firstNumber: match[1],
    secondNumber: match[2],
  }));
}

async function day3() {
  const filePath = "./src/input/2024/input3.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const command = fileContent.join("");

  const validCommands = [...command.matchAll(matchForMultiply)];

  const valuesToMultiply = extractValues(validCommands);

  const result1 = multiplyValues(valuesToMultiply);

  console.log("result1", result1);

  ///////////////////////////////////////////////////// Part 2

  const filteredSentence = command.replace(blockedParts, "");

  const validCommandsPart2 = [...filteredSentence.matchAll(matchForMultiply)];

  const valuesToMultiply2 = extractValues(validCommandsPart2);

  const result2 = multiplyValues(valuesToMultiply2);

  console.log("result2", result2);
}

module.exports = { day3 };
