const { readFileAndCreateArray } = require("../helper/readFile");
const range = require("lodash/range");

async function day5part1() {
  const filePath = "./src/input/input5.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const elements = [];

  let temp = [];

  fileContent.forEach((row) => {
    if (row === "") {
      elements.push(temp);
      temp = [];
      return;
    }

    temp.push(row);
  });

  const [seeds, ...details] = elements;

  const seedNumbers = seeds
    .join(" ")
    .match(/\d+/g)
    .map((number) => parseInt(number));

  console.log("seedNumbers", seedNumbers);

  const mappings = details.reduce((acc, curr) => {
    const [key, ...numbers] = curr;

    const mappingNumbers = numbers.reduce((init, number) => {
      const [dest, start, rg] = number
        .match(/\d+/g)
        .map((number) => parseInt(number));

      range(start, start + rg).forEach(
        (res, index) => (init[res] = dest + index)
      );

      return init;
    }, {});

    acc[key] = mappingNumbers;
    return acc;
  }, {});

  //console.log("mappings", mappings);
}

module.exports = { day5part1 };
