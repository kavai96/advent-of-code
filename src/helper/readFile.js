const fs = require("fs").promises;

async function readFileAndCreateArray(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");

    const dataArray = data.split("\n");

    if (dataArray[dataArray.length - 1] === "") {
      dataArray.pop();
    }

    return dataArray;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

module.exports = { readFileAndCreateArray };
