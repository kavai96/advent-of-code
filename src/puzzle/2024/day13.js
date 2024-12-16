const { readFileAndCreateArray } = require("../../helper/readFile");

const regex = /X[+=](\d+), Y[+=](\d+)/;

const getValues = (row) => {
  const match = row.match(regex);

  if (match) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    return { x, y };
  }
};

function solveEquations(aButton, bButton, prize, incrementer = 0) {
  const a1 = aButton.x,
    b1 = bButton.x,
    c1 = prize.x + incrementer;

  const a2 = aButton.y,
    b2 = bButton.y,
    c2 = prize.y + incrementer;

  const determinant = a1 * b2 - a2 * b1;

  const x = (c1 * b2 - c2 * b1) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return false;
  }

  return [x, y];
}

const generateSolution = (machines, incrementer = 0) => {
  return machines.reduce((prev, machine) => {
    const buttonA = getValues(machine[0]);
    const buttonB = getValues(machine[1]);
    const prize = getValues(machine[2]);

    const tokens = solveEquations(buttonA, buttonB, prize, incrementer);

    if (tokens) {
      const [x, y] = tokens;

      prev += 3 * x + y;
    }

    return prev;
  }, 0);
};

const day13 = async () => {
  const filePath = "./src/input/2024/input13.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const machines = [];
  let items = [];

  fileContent.forEach((row) => {
    if (row.trim() === "") {
      return;
    }

    items.push(row);

    if (items.length === 3) {
      machines.push(items);
      items = [];
    }
  });

  const part1 = generateSolution(machines);
  const part2 = generateSolution(machines, 10000000000000);

  console.log("part1", part1);
  console.log("part2", part2);
};

module.exports = { day13 };
