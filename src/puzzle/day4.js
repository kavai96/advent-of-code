const { readFileAndCreateArray } = require("../helper/readFile");

async function day4Part1() {
  const filePath = "./src/input/input4.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const result = fileContent
    .map((text) => {
      const [_, numbers] = text.split(":");
      const [winningNumbers, myNumbers] = numbers.split("|");

      const parsedWins = winningNumbers
        .match(/\d+/g)
        .map((number) => parseInt(number));

      const parsedMyNumbers = myNumbers
        .match(/\d+/g)
        .map((number) => parseInt(number));

      const wins = parsedMyNumbers.filter((number) =>
        parsedWins.includes(number)
      ).length;

      if (wins === 0) return 0;

      return Math.pow(2, wins - 1);
    })
    .reduce((acc, curr) => (acc += curr), 0);

  console.log("result", result);
}

async function day4Part2() {
  const filePath = "./src/input/input4.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  let allScratchCard = 0;

  const content = fileContent.map((text) => {
    const [_, numbers] = text.split(":");
    const [winningNumbers, myNumbers] = numbers.split("|");

    const parsedWins = winningNumbers
      .match(/\d+/g)
      .map((number) => parseInt(number));

    const parsedMyNumbers = myNumbers
      .match(/\d+/g)
      .map((number) => parseInt(number));

    return [parsedWins, parsedMyNumbers];
  });

  content.forEach(([parsedWins, parsedMyNumbers], index) => {
    const wins = parsedMyNumbers.filter((number) =>
      parsedWins.includes(number)
    ).length;

    allScratchCard += countWonCards(index + 1, wins, content);
  });

  console.log("result", allScratchCard + content.length);
}

const countWonCards = (startIndex, wonCount, allContent) => {
  let summary = wonCount;

  for (let i = startIndex; i < startIndex + wonCount; i++) {
    if (!allContent[i]) continue;

    const [winningNumbers, myNumbers] = allContent[i];

    const wins = myNumbers.filter((number) =>
      winningNumbers.includes(number)
    ).length;

    summary += countWonCards(i + 1, wins, allContent);
  }

  return summary;
};

module.exports = { day4Part1, day4Part2 };
