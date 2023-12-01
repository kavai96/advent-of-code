const { readFileAndCreateArray } = require("../helper/readFile");

const allowedNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const isNumber = (character) => {
  return /\d/.test(character);
};

async function day1() {
  const filePath = "./src/input/input1.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const result = fileContent
    .map((text) => {
      //-> for second part
      let transformedText = "";
      for (let i = 0; i < text.length; i++) {
        const helper = text.substring(i);

        if (isNumber(text.charAt(i))) {
          transformedText += text.charAt(i);
          continue;
        }

        Object.keys(allowedNumbers).forEach((key) => {
          if (helper.startsWith(key)) {
            transformedText += allowedNumbers[key];
          }
        });
      }

      return transformedText;
    })
    //.map((text) => text.replace(/\D/g, "")) -> for first part
    .map((number) => {
      if (number.length === 1) return `${number}${number}`;

      const firstDigit = number[0];
      const lastDigit = number[number.length - 1];

      return `${firstDigit}${lastDigit}`;
    })
    .map((number) => parseInt(number))
    .reduce((acc, curr) => acc + parseInt(curr), 0);

  console.log("Result:", result);
}

module.exports = { day1 };
