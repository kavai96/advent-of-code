const { readFileAndCreateArray } = require("../../helper/readFile");

function generatePossibleEquasions(numbers, operators) {
  const numOperators = numbers.length - 1;
  const totalCombinations = Math.pow(operators.length, numOperators);

  const possibleEquasions = [];

  for (let i = 0; i < totalCombinations; i++) {
    let equasion = [numbers[0]];
    let currentCombination = i;

    for (let j = 0; j < numOperators; j++) {
      const operatorIndex = currentCombination % operators.length;
      equasion.push(operators[operatorIndex]);
      equasion.push(numbers[j + 1]);
      currentCombination = Math.floor(currentCombination / operators.length);
    }

    possibleEquasions.push(equasion);
  }

  return possibleEquasions;
}

const validateFirstPart = (numbers, result) => {
  const possibleEquasions = generatePossibleEquasions(numbers, ["+", "*"]);

  return possibleEquasions.some((equasion) => {
    let operationResult = equasion[0];

    for (let i = 0; i < equasion.length - 1; i += 2) {
      const operator = equasion[i + 1];
      const nextValue = equasion[i + 2];

      switch (operator) {
        case "+":
          operationResult += nextValue;
          break;
        case "*":
          operationResult *= nextValue;
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }

    return operationResult === result;
  });
};

const validateSecondPart = (numbers, result) => {
  const possibleEquasions = generatePossibleEquasions(numbers, [
    "+",
    "*",
    "||",
  ]);

  return possibleEquasions.some((equasion) => {
    let operationResult = equasion[0];

    for (let i = 0; i < equasion.length - 1; i += 2) {
      const operator = equasion[i + 1];
      const nextValue = equasion[i + 2];

      switch (operator) {
        case "+":
          operationResult += nextValue;
          break;
        case "*":
          operationResult *= nextValue;
          break;
        case "||":
          operationResult = Number(`${operationResult}${nextValue}`);
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }

    return operationResult === result;
  });
};

const countValidEquasions = (equasions, validator) => {
  return equasions.reduce((acc, equasion) => {
    const [result, numbers] = equasion;

    const convertedResult = Number(result);
    const convertedNumbers = numbers.split(" ").map(Number);

    const hasValidEquasion = validator(convertedNumbers, convertedResult);

    if (hasValidEquasion) {
      return (acc += convertedResult);
    }

    return acc;
  }, 0);
};

const day7 = async () => {
  const filePath = "./src/input/2024/input7.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const equasions = fileContent.map((row) => row.split(": "));

  const part1 = countValidEquasions(equasions, validateFirstPart);
  console.log("part1", part1);

  const part2 = countValidEquasions(equasions, validateSecondPart);
  console.log("part2", part2);
};

module.exports = { day7 };
