const { readFileAndCreateArray } = require("../../helper/readFile");

const findLimitsForPage = (page, limits) => {
  return limits.filter((limit) => limit.left === page || limit.right === page);
};

const isPageOrderValid = (pageOrder, limits) => {
  return pageOrder.every((page) => {
    const limitsForPage = findLimitsForPage(page, limits);

    if (limitsForPage.length === 0) return true;

    return limitsForPage.every((limit) => {
      const pageIndex = pageOrder.indexOf(page);

      if (limit.left === page) {
        const rightIndex = pageOrder.indexOf(limit.right);
        return rightIndex === -1 || pageIndex < rightIndex;
      }

      if (limit.right === page) {
        const leftIndex = pageOrder.indexOf(limit.left);
        return leftIndex === -1 || leftIndex < pageIndex;
      }
    });
  });
};

const rearrangeArray = (command, limits) => {
  command.forEach((number) => {
    const limitsForNumber = findLimitsForPage(number, limits);
    if (limitsForNumber.length === 0) return;

    limitsForNumber.forEach((limit) => {
      const numberIndex = command.indexOf(number);

      if (limit.left === number) {
        const rightIndex = command.indexOf(limit.right);

        if (rightIndex !== -1 && numberIndex > rightIndex) {
          [command[numberIndex], command[rightIndex]] = [
            command[rightIndex],
            command[numberIndex],
          ];

          rearrangeArray(command, limits);
        }
      }

      if (limit.right === number) {
        const leftIndex = command.indexOf(limit.left);

        if (leftIndex !== -1 && leftIndex > numberIndex) {
          [command[numberIndex], command[leftIndex]] = [
            command[leftIndex],
            command[numberIndex],
          ];

          rearrangeArray(command, limits);
        }
      }
    });
  });
};

const processFileContent = (fileContent) => {
  let limitEnd = false;
  const limits = [];
  const pageOrders = [];

  fileContent.forEach((row) => {
    if (row === "") {
      limitEnd = true;
      return;
    }

    if (!limitEnd) {
      const [left, right] = row.split("|").map(Number);
      limits.push({ left, right });
    } else {
      const command = row.split(",").map(Number);
      pageOrders.push(command);
    }
  });

  return { limits, pageOrders };
};

const calculatePart1 = (pageOrders, limits) => {
  return pageOrders.reduce((prev, pageOrder) => {
    if (isPageOrderValid(pageOrder, limits)) {
      const middle = pageOrder[Math.floor(pageOrder.length / 2)];
      return prev + middle;
    }

    return prev;
  }, 0);
};

const calculatePart2 = (pageOrders, limits) => {
  const invalidPageOrders = pageOrders.filter(
    (command) => !isPageOrderValid(command, limits)
  );

  invalidPageOrders.forEach((command) => rearrangeArray(command, limits));

  return invalidPageOrders.reduce((prev, pageOrder) => {
    const middle = pageOrder[Math.floor(pageOrder.length / 2)];
    return prev + middle;
  }, 0);
};

const day5 = async () => {
  const filePath = "./src/input/2024/input5.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const { limits, pageOrders } = processFileContent(fileContent);

  const part1 = calculatePart1(pageOrders, limits);
  console.log("part1", part1);

  const part2 = calculatePart2(pageOrders, limits);
  console.log("part2", part2);
};

module.exports = { day5 };
