const { readFileAndCreateArray } = require("../../helper/readFile");

const findRulesForPageOrder = (page, rules) => {
  return rules.filter(
    (rule) => rule.leftOrder === page || rule.rightOrder === page
  );
};

const isPageOrderValid = (pageOrder, rules) => {
  return pageOrder.every((page) => {
    const rulesForPageOrder = findRulesForPageOrder(page, rules);

    if (rulesForPageOrder.length === 0) return true;

    return rulesForPageOrder.every((rule) => {
      const pageIndex = pageOrder.indexOf(page);

      if (rule.leftOrder === page) {
        const rightIndex = pageOrder.indexOf(rule.rightOrder);
        return rightIndex === -1 || pageIndex < rightIndex;
      }

      if (rule.rightOrder === page) {
        const leftIndex = pageOrder.indexOf(rule.leftOrder);
        return leftIndex === -1 || leftIndex < pageIndex;
      }
    });
  });
};

const rearrangePageOrder = (pageOrder, rules) => {
  pageOrder.forEach((page) => {
    const rulesForPageOrder = findRulesForPageOrder(page, rules);
    if (rulesForPageOrder.length === 0) return;

    rulesForPageOrder.forEach((rule) => {
      const pageIndex = pageOrder.indexOf(page);

      if (rule.leftOrder === page) {
        const rightIndex = pageOrder.indexOf(rule.rightOrder);

        if (rightIndex !== -1 && pageIndex > rightIndex) {
          [pageOrder[pageIndex], pageOrder[rightIndex]] = [
            pageOrder[rightIndex],
            pageOrder[pageIndex],
          ];

          rearrangePageOrder(pageOrder, rules);
        }
      }

      if (rule.rightOrder === page) {
        const leftIndex = pageOrder.indexOf(rule.leftOrder);

        if (leftIndex !== -1 && leftIndex > pageIndex) {
          [pageOrder[pageIndex], pageOrder[leftIndex]] = [
            pageOrder[leftIndex],
            pageOrder[pageIndex],
          ];

          rearrangePageOrder(pageOrder, rules);
        }
      }
    });
  });
};

const processFileContent = (fileContent) => {
  let rulesEnd = false;
  const rules = [];
  const pageOrders = [];

  fileContent.forEach((row) => {
    if (row === "") {
      rulesEnd = true;
      return;
    }

    if (!rulesEnd) {
      const [leftOrder, rightOrder] = row.split("|").map(Number);
      rules.push({ leftOrder, rightOrder });
    } else {
      const command = row.split(",").map(Number);
      pageOrders.push(command);
    }
  });

  return { rules, pageOrders };
};

const calculatePart1 = (pageOrders, rules) => {
  return pageOrders.reduce((prev, pageOrder) => {
    if (isPageOrderValid(pageOrder, rules)) {
      const middle = pageOrder[Math.floor(pageOrder.length / 2)];
      return prev + middle;
    }

    return prev;
  }, 0);
};

const calculatePart2 = (pageOrders, rules) => {
  const invalidPageOrders = pageOrders.filter(
    (command) => !isPageOrderValid(command, rules)
  );

  invalidPageOrders.forEach((command) => rearrangePageOrder(command, rules));

  return invalidPageOrders.reduce((prev, pageOrder) => {
    const middle = pageOrder[Math.floor(pageOrder.length / 2)];
    return prev + middle;
  }, 0);
};

const day5 = async () => {
  const filePath = "./src/input/2024/input5.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const { rules, pageOrders } = processFileContent(fileContent);

  const part1 = calculatePart1(pageOrders, rules);
  console.log("part1", part1);

  const part2 = calculatePart2(pageOrders, rules);
  console.log("part2", part2);
};

module.exports = { day5 };
