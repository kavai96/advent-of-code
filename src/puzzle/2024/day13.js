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

    if (X / aButton.x < 1 || (Y / aButton.y) < 1) {
      bXTimes--;
      continue;
    }

    if()
  }
};

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

  prizes.forEach((prize) => {
    console.log(getValues(prize[0]));
    const aButton = getValues(prize[0]);
    const bButton = getValues(prize[1]);
    const prize = getValues(prize[2]);
    calculatePrize(aButton, bButton, prize);
  });

  console.log(prizes);
};

module.exports = { day13 };
