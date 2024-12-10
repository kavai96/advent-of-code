const { readFileAndCreateArray } = require("../../helper/readFile");

const rearrange = (input) => {
  {
    let leftIndex = -1;
    let rightIndex = -1;
    let i = 0;
    let j = input.length - 1;

    while (true) {
      if (input[i] === "." && leftIndex < 0) {
        leftIndex = i;
      } else if (input[i] !== "." && leftIndex === -1) {
        i++;
      }

      if (typeof input[j] === "number" && rightIndex < 0) {
        rightIndex = j;
      } else if (typeof input[j] !== "number" && rightIndex === -1) {
        j--;
      }

      if (leftIndex > -1 && rightIndex > -1 && leftIndex < rightIndex) {
        input[leftIndex] = input[rightIndex];
        input[rightIndex] = ".";

        leftIndex = -1;
        rightIndex = -1;

        i++;
        j--;
      }

      if (i > j) {
        break; // middle reached
      }
    }
  }
};

const rearrangePart2 = (files, spaces) => {
  for (let i = files.length - 1; i > 0; i--) {
    const file = files[i];

    for (let j = 0; j < spaces.length; j++) {
      const space = spaces[j];

      if (
        j < i &&
        space.filter((element) => element === ".").length >= file.length
      ) {
        const index = space.indexOf(".");
        spaces[j].fill(file[0], index, index + file.length);
        files[i].fill(".");
        break;
      }
    }
  }
};

const countSum = (disk) => {
  return disk.reduce((prev, item, index) => {
    if (item === ".") {
      return prev;
    }

    return prev + index * item;
  }, 0);
};

const day9 = async () => {
  const filePath = "./src/input/2024/input9.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const input = fileContent[0].split("").map(Number);

  const disk = [];

  // For part 2
  const files = [];
  const spaces = [];

  let fileId = 0;

  input.forEach((item, i) => {
    const isOdd = i % 2;

    const array = new Array(item);

    if (isOdd) {
      array.fill(".");
      spaces.push(array);
    } else {
      array.fill(fileId);
      files.push(array);
      fileId++;
    }

    disk.push(...array);
  });

  rearrange(disk);

  const part1 = countSum(disk);

  console.log("part1", part1);

  ///////////////////////////////////////// Part 2

  rearrangePart2(files, spaces);

  const result = [];
  const maxLength = Math.max(files.length, spaces.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < files.length) {
      result.push(...files[i]);
    }
    if (i < spaces.length) {
      result.push(...spaces[i]);
    }
  }

  const part2 = countSum(result);

  console.log("part2", part2);
};

module.exports = { day9 };
