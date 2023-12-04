const { readFileAndCreateArray } = require("../helper/readFile");

const isNumber = (character) => {
  return /\d/.test(character);
};

async function day3part1() {
  const filePath = "./src/input/input3.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const test = fileContent.reduce((acc, current) => {
    const characters = current.split("").filter((char) => char !== "\r");
    acc.push(characters);
    return acc;
  }, []);

  const res = [];

  let valid = false;

  let tempNumber = "";

  test.forEach((row, i) => {
    row.forEach((char, j) => {
      if ((char === "." || !isNumber(char)) && tempNumber.length > 0) {
        if (valid) {
          res.push(tempNumber);
        }

        tempNumber = "";
        valid = false;

        return;
      }

      if (j === row.length - 1 && tempNumber.length > 0) {
        if (valid) {
          res.push(tempNumber + char);
        }

        tempNumber = "";
        valid = false;

        return;
      }

      if (char === ".") return;

      if (!isNumber(char)) return;

      tempNumber += char;

      if (valid) return;

      valid = checkNeighbours(i, j, test);
    });
  });

  const result = res
    .map((number) => parseInt(number))
    .reduce((acc, curr) => (acc += curr), 0);

  console.log("res", result);
}

const generateNeighbourCoordinates = (i, j) => {
  return [
    { i: i - 1, j: j - 1 },
    { i: i - 1, j },
    { i: i - 1, j: j + 1 },
    { i, j: j - 1 },
    { i, j: j + 1 },
    { i: i + 1, j: j - 1 },
    { i: i + 1, j },
    { i: i + 1, j: j + 1 },
  ];
};

const checkNeighbours = (i, j, content) => {
  const coordinates = generateNeighbourCoordinates(i, j);

  return coordinates.some((cr) => {
    const first = content[cr.i];
    if (!first) return false;

    const field = first[cr.j];

    return field && !isNumber(field) && field !== ".";
  });
};

module.exports = { day3part1 };
