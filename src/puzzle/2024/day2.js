const { readFileAndCreateArray } = require("../../helper/readFile");

const isAllNumbersIncreasingOrDecreasing = (numbers) => {
  const increasing = numbers.every((number, index) => {
    if (index === 0) {
      return true;
    }

    return number > numbers[index - 1];
  });

  const decreasing = numbers.every((number, index) => {
    if (index === 0) {
      return true;
    }

    return number < numbers[index - 1];
  });

  return increasing || decreasing;
};

const isDifferenceInRange = (numbers) => {
  const inRange = numbers.every((number, index) => {
    if (index === 0) {
      return true;
    }

    const difference = Math.abs(number - numbers[index - 1]);

    return difference >= 1 && difference <= 3;
  });

  return inRange;
};

const createRowVariants = (numbers) => {
  return numbers.map((_, idx) => {
    const temp = [...numbers];
    temp.splice(idx, 1);
    return temp;
  });
};

const day2 = async () => {
  const filePath = "./src/input/2024/input2.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const rows = fileContent.map((item) => item.split(/\s+/).map(Number));

  const part1 = rows.reduce((init, actual) => {
    if (
      isAllNumbersIncreasingOrDecreasing(actual) &&
      isDifferenceInRange(actual)
    ) {
      init += 1;
    }

    return init;
  }, 0);

  console.log(part1);

  /////////////////////////////////////////// Part 2

  const part2 = rows.reduce((init, actual) => {
    const rowVariants = createRowVariants(actual);

    const valid = rowVariants.some((row) => {
      return (
        isAllNumbersIncreasingOrDecreasing(row) && isDifferenceInRange(row)
      );
    });

    if (valid) {
      init += 1;
    }

    return init;
  }, 0);

  console.log(part2);
};

module.exports = { day2 };
