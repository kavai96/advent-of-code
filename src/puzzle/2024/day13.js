const { readFileAndCreateArray } = require("../../helper/readFile");

const regex = /X[+=](\d+), Y[+=](\d+)/;

const getValues = (row) => {
  const match = row.match(regex);

  if (match) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    return { x, y };
  } else {
    console.log("No match found for:", str);
  }
};

const calculatePrize = (aButton, bButton, prize) => {
  const bTimesX = Math.floor(prize.x / bButton.x);
  const bTimesY = Math.floor(prize.y / bButton.y);

  const remainderX = prize.x % bButton.x;
  const remainderY = prize.y % bButton.y;

  if (remainderX === 0 && remainderY === 0) {
    return [bTimesX, bTimesY];
  }

  let bXTimes = bTimesX;
  let bYTimes = bTimesY;
  let aCounter = 1;
  while (true) {
    const X = prize.x - bXTimes * bButton.x;
    const Y = prize.y - bXTimes * bButton.y;

    if (X / aButton.x < 1 || Y / aButton.y < 1) {
      bXTimes--;
      continue;
    }
  }
};

const operators = ["a", "b"];

const calculate = (aButton, bButton, prize) => {
  let aTimes = 0;
  let bTimes = 0;

  const dfs = (sum) => {
    console.log("sum", sum);
    if (sum.x === prize.x && sum.y === prize.y) {
      return { aTimes, bTimes };
    }

    if (sum.x > prize.x || sum.y > prize.y) {
      return false;
    }

    for (const operator of operators) {
      console.log("operator", operator);
      switch (operator) {
        case "a":
          sum.x += aButton.x;
          sum.y += aButton.y;
          aTimes++;

          dfs(sum);
          break;
        case "b":
          sum.x += bButton.x;
          sum.y += bButton.y;
          bTimes++;

          dfs(sum);
          break;
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }
  };

  return dfs({ x: 0, y: 0 });
};

function minTokensToWin([ax, ay], [bx, by], [X, Y]) {
  if ([ax, ay, bx, by].some((v) => v === 0)) return null;
  const tb = Math.floor((ay * X - ax * Y) / (ay * bx - ax * by));
  const ta = Math.floor((X - bx * tb) / ax);
  return ax * ta + bx * tb === X && ay * ta + by * tb === Y ? [ta, tb] : null;
}

function solveEquations(aButton, bButton, prize) {
  // Coefficients of the equations
  const a1 = aButton.x,
    b1 = bButton.x,
    c1 = prize.x;
  const a2 = aButton.y,
    b2 = bButton.y,
    c2 = prize.y;

  // Calculate determinant
  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    return "No unique solution exists.";
  }

  // Cramer's rule to find x and y
  const x = (c1 * b2 - c2 * b1) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;

  if (x > 100 || y > 100 || !Number.isInteger(x) || !Number.isInteger(y)) {
    return false;
  }

  return [x, y];
}

const calc = (aButton, bButton, prize) => {
  let counter = 1;
  let found = false;

  while (true) {
    const testX = prize.x - counter * aButton.x;
    const testY = prize.y - counter * aButton.y;

    if (testX % bButton.x === 0 && testY % bButton.y === 0) {
      found = true;
    }

    if (counter > 100 || counter * aButton.x > prize.x || found) {
      break;
    }

    counter++;
  }

  if (found && (prize.x - counter * aButton.x) / bButton.x <= 100) {
    return [counter, (prize.x - counter * aButton.x) / bButton.x];
  }

  return false;
};
/* 
const calc = (a, b, c, d, prizeX, prizeY) => {
  let counter = 1;
  let found = false;

  while (true) {
    const testX = prizeX - counter * a;
    const testY = prizeY - counter * c;

    if (testX % b === 0 && testY % d === 0) {
      found = true;
    }

    if (counter * a > prizeX || found) {
      break;
    }

    counter++;
  }

  if (found) {
    console.log("calc", counter, (prizeX - counter * a) / b);
  }
};
 */
const day13 = async () => {
  const filePath = "./src/input/2024/input13.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const prizes = [];
  let index = 0;
  let items = [];
  fileContent.forEach((row) => {
    if (row.trim() === "") {
      index++;
      prizes.push(items);
      items = [];

      return;
    }

    items.push(row);
  });

  extractedValues = [];

  let sum = 0;

  prizes.forEach((prize) => {
    const aButton = getValues(prize[0]);
    const bButton = getValues(prize[1]);
    const prizee = getValues(prize[2]);
    //calculatePrize(aButton, bButton, prize);
    //console.log(calculate(aButton, bButton, prizee));

    //console.log(calculateMultiplications(prize[0].x, prize[1].x, prize[2].x));
    //console.log(calc(94, 22, 34, 67, 8400, 5400));
    //console.log(calc(aButton, bButton, prizee));
    //const tokens = calc(aButton, bButton, prizee);
    //const tokens = solveEquations(aButton, bButton, prizee);

    const tokens = minTokensToWin(
      [aButton.x, aButton.y],
      [bButton.x, bButton.y],
      [prizee.x, prizee.y]
    );
    if (tokens) {
      const [x, y] = tokens;

      sum += 3 * x + y;
    }
  });

  console.log(sum);
};

module.exports = { day13 };
