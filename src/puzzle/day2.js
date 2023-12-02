const { readFileAndCreateArray } = require("../helper/readFile");

const LIMITS = {
  red: 12,
  green: 13,
  blue: 14,
};

async function day2Part1() {
  const filePath = "./src/input/input2.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let result = 0;

  fileContent
    .map((text) => {
      const [game, bags] = text.split(":");
      const [_, gameId] = game.split(" ");

      const bagArray = bags.split(/[;,]/).map((bag) => bag.trim());

      const limitExceeded = bagArray.some((bag) => {
        const [amount, color] = bag.split(" ");

        return LIMITS[color] < parseInt(amount);
      });

      return { gameId, limitExceeded };
    })
    .filter((game) => game.limitExceeded === false)
    .forEach(({ gameId }) => {
      result += parseInt(gameId);
    });

  console.log("Result:", result);
}

async function day2Part2() {
  const filePath = "./src/input/input2.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let result = 0;

  fileContent
    .map((text) => {
      const [_, bags] = text.split(":");

      const baseValues = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const bagArray = bags.split(/[;,]/).map((bag) => bag.trim());

      bagArray.forEach((bag) => {
        const [amount, color] = bag.split(" ");

        const parsedAmount = parseInt(amount);

        if (baseValues[color] < parsedAmount) {
          baseValues[color] = parsedAmount;
        }
      });

      return baseValues;
    })
    .map((calculated) => {
      return Object.values(calculated).reduce(
        (acc, curr) => (acc = acc * curr),
        1
      );
    })

    .forEach((power) => {
      result += power;
    });

  console.log("Result:", result);
}

module.exports = { day2Part1, day2Part2 };
