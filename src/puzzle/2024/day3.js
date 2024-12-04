const { readFileAndCreateArray } = require("../../helper/readFile");

const matchForMultiply = /mul\((\d+),(\d+)\)/g;

const blockedParts = /don't\(\).*?do\(\)/g;

const multiplyValues = (numbers) => {
  return numbers.reduce((sum, { firstNumber, secondNumber }) => {
    return sum + firstNumber * secondNumber;
  }, 0);
};

const extractValues = (commands) => {
  return commands.map((match) => ({
    firstNumber: Number(match[1]),
    secondNumber: Number(match[2]),
  }));
};

const generateResult = (command) => {
  const validCommands = [...command.matchAll(matchForMultiply)];
  const valuesToMultiply = extractValues(validCommands);

  return multiplyValues(valuesToMultiply);
};

const day3 = async () => {
  const filePath = "./src/input/2024/input3.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const command = fileContent.join("");
  const result1 = generateResult(command);

  console.log("result1", result1);

  ///////////////////////////////////////////////////// Part 2

  const filteredCommand = command.replace(blockedParts, "");
  const result2 = generateResult(filteredCommand);

  console.log("result2", result2);
};

module.exports = { day3 };
