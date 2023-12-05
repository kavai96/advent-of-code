const { readFileAndCreateArray } = require("../helper/readFile");

const isNumber = (character) => {
  return /\d/.test(character);
};

async function day3part1() {
  const filePath = "./src/input/input3.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const matrix = fileContent.reduce((acc, current) => {
    const characters = current.split("").filter((char) => char !== "\r");
    acc.push(characters);
    return acc;
  }, []);

  const res = [];

  let valid = false;

  let tempNumber = "";

  matrix.forEach((row, i) => {
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

      valid = checkNeighbours(i, j, matrix);
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

async function day3part2() {
  const filePath = "./src/input/input3.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const matrix = fileContent.reduce((acc, current) => {
    const characters = current.split("").filter((char) => char !== "\r");
    acc.push(characters);
    return acc;
  }, []);

  let sum = 0;

  matrix.forEach((row, i) => {
    row.forEach((char, j) => {
      if (char !== "*") return;

      const neighbours = countNeighbours(i, j, matrix);

      if (neighbours.length !== 2) return;

      const [ratio1, ratio2] = neighbours;

      sum += parseInt(ratio1) * parseInt(ratio2);
    });
  });

  console.log("res", sum);
}

const generateNeighbourCoordinates2 = (i, j) => {
  return [
    { i: i - 1, j: j - 3 },
    { i: i - 1, j: j - 2 },
    { i: i - 1, j: j - 1 },
    { i: i - 1, j },
    { i: i - 1, j: j + 1 },
    { i: i - 1, j: j + 2 },
    { i: i - 1, j: j + 3 },

    { i, j: j - 3 },
    { i, j: j - 2 },
    { i, j: j - 1 },
    { i, j },
    { i, j: j + 1 },
    { i, j: j + 2 },
    { i, j: j + 3 },

    { i: i + 1, j: j - 3 },
    { i: i + 1, j: j - 2 },
    { i: i + 1, j: j - 1 },
    { i: i + 1, j },
    { i: i + 1, j: j + 1 },
    { i: i + 1, j: j + 2 },
    { i: i + 1, j: j + 3 },
  ];
};

const countNeighbours = (starI, starJ, content) => {
  const coordinates = generateNeighbourCoordinates2(starI, starJ);

  let valid = false;

  let tempNumber = "";

  return coordinates.reduce((acc, curr) => {
    const first = content[curr.i];
    if (!first) return acc;

    const field = first[curr.j];

    if (!field) return acc;

    if (!isNumber(field) && tempNumber.length > 0) {
      if (valid) {
        if (tempNumber.length > 3) acc.push(tempNumber);
      }

      tempNumber = "";
      valid = false;

      return acc;
    }

    if (curr.j - starJ === 3) {
      if (valid && !isNumber(field) && tempNumber.length > 0) {
        if (tempNumber.length > 3) acc.push(tempNumber);
      }

      if (valid && isNumber(field) && tempNumber.length > 0) {
        if (tempNumber.length > 3) acc.push(tempNumber + field);
      }

      tempNumber = "";
      valid = false;

      return acc;
    }

    if (!isNumber(field)) return acc;

    tempNumber += field;

    if (valid) return acc;

    valid = checkNeighbours2(curr.i, curr.j, starI, starJ);

    return acc;
  }, []);
};

const checkNeighbours2 = (i, j, starI, starJ) => {
  const coordinates = generateNeighbourCoordinates(i, j);

  return coordinates.some((cr) => {
    return cr.i === starI && cr.j === starJ;
  });
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

module.exports = { day3part1, day3part2 };
