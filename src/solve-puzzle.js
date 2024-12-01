//const { day1 } = require("./puzzle/day1");
const { day2Part1, day2Part2 } = require("./puzzle/day2");
const { day3part1, day3part2 } = require("./puzzle/day3");
const { day4Part1, day4Part2 } = require("./puzzle/day4");
const { day5part1 } = require("./puzzle/day5");

const { day1 } = require("./puzzle/2024/day1");

async function run() {
  await day1();
  process.exit(0);
}

run();
