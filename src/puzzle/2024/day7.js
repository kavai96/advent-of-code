const { readFileAndCreateArray } = require("../../helper/readFile");

function generatePossibleEquations(numbers, operators) {
  const numOperators = numbers.length - 1;
  const totalCombinations = Math.pow(operators.length, numOperators);

  const possibleEquations = [];

  for (let i = 0; i < totalCombinations; i++) {
    let equation = [numbers[0]];
    let currentCombination = i;

    for (let j = 0; j < numOperators; j++) {
      const operatorIndex = currentCombination % operators.length;
      equation.push(operators[operatorIndex]);
      equation.push(numbers[j + 1]);
      currentCombination = Math.floor(currentCombination / operators.length);
    }

    possibleEquations.push(equation);
  }

  return possibleEquations;
}

const validateFirstPart = (numbers, result) => {
  const possibleEquations = generatePossibleEquations(numbers, ["+", "*"]);

  return possibleEquations.some((equation) => {
    let operationResult = equation[0];

    for (let i = 0; i < equation.length - 1; i += 2) {
      const operator = equation[i + 1];
      const nextValue = equation[i + 2];

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
  const possibleEquations = generatePossibleEquations(numbers, [
    "+",
    "*",
    "||",
  ]);

  return possibleEquations.some((equation) => {
    let operationResult = equation[0];

    for (let i = 0; i < equation.length - 1; i += 2) {
      const operator = equation[i + 1];
      const nextValue = equation[i + 2];

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

const countValidEquations = (equations, validator) => {
  return equations.reduce((acc, equation) => {
    const [result, numbers] = equation;

    const convertedResult = Number(result);
    const convertedNumbers = numbers.split(" ").map(Number);

    const hasValidEquation = validator(convertedNumbers, convertedResult);

    if (hasValidEquation) {
      return (acc += convertedResult);
    }

    return acc;
  }, 0);
};

function validateEquationsDFS(
  numbers,
  operators,
  result,
  allowConcatenation = false
) {
  const dfs = (index, currentValue) => {
    if (index === numbers.length) {
      return currentValue === result;
    }

    for (const operator of operators) {
      let nextValue;

      switch (operator) {
        case "+":
          nextValue = currentValue + numbers[index];
          break;
        case "*":
          nextValue = currentValue * numbers[index];
          break;
        case "||":
          if (!allowConcatenation) continue;
          nextValue = Number(`${currentValue}${numbers[index]}`);
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }

      if (dfs(index + 1, nextValue)) {
        return true; // Stop early if valid equation found
      }
    }

    return false;
  };

  return dfs(1, numbers[0]); // Start DFS from the second number
}

const day7 = async () => {
  const filePath = "./src/input/2024/input7.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const equations = fileContent.map((row) => row.split(": "));

  /* const part1 = countValidEquations(equations, validateFirstPart);
  const part2 = countValidEquations(equations, validateSecondPart);
 */

  const part1 = countValidEquations(equations, (numbers, result) =>
    validateEquationsDFS(numbers, ["+", "*"], result)
  );

  const part2 = countValidEquations(equations, (numbers, result) =>
    validateEquationsDFS(numbers, ["+", "*", "||"], result, true)
  );

  console.log("part1", part1);
  console.log("part2", part2);
};

module.exports = { day7 };
