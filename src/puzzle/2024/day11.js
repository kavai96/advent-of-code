const { readFileAndCreateArray } = require("../../helper/readFile");

const generateStones = (stone, blinkCount, visitedStones) => {
  if (blinkCount === 0) {
    return 1;
  }

  const key = `${stone}-${blinkCount}`;

  if (visitedStones.has(key)) return visitedStones.get(key);

  let generatedStonesCount = 0;

  if (stone === 0) {
    generatedStonesCount = generateStones(1, blinkCount - 1, visitedStones);
  } else if (stone.toString().length % 2 === 0) {
    const strStone = stone.toString();
    const mid = strStone.length / 2;
    const partOne = parseInt(strStone.slice(0, mid), 10);
    const partTwo = parseInt(strStone.slice(mid), 10);

    generatedStonesCount =
      generateStones(partOne, blinkCount - 1, visitedStones) +
      generateStones(partTwo, blinkCount - 1, visitedStones);
  } else {
    generatedStonesCount = generateStones(
      stone * 2024,
      blinkCount - 1,
      visitedStones
    );
  }

  visitedStones.set(key, generatedStonesCount);

  return generatedStonesCount;
};

const day11 = async () => {
  const filePath = "./src/input/2024/input11.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const stones = fileContent[0].split(" ").map(Number);

  const visitedStones = new Map();

  const part1 = stones.reduce((prev, stone) => {
    return (prev += generateStones(stone, 25, visitedStones));
  }, 0);

  const part2 = stones.reduce((prev, stone) => {
    return (prev += generateStones(stone, 75, visitedStones));
  }, 0);

  console.log("part1", part1);
  console.log("part2", part2);
};

module.exports = { day11 };
