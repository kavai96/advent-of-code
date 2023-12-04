const { day1 } = require("./puzzle/day1");
const { day2Part1, day2Part2 } = require("./puzzle/day2");
const { day3part1 } = require("./puzzle/day3");
const { day4Part1, day4Part2 } = require("./puzzle/day4");

async function run() {
  //await day1();
  //await day2Part1();
  //await day4Part2();
  await day3part1();
  process.exit(0);
}

run();
