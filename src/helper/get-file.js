const fs = require("fs");
const axios = require("axios");

//1/input
const DAY = process.argv[2];

const SESSION = process.env.SESSION;
const YEAR = process.env.YEAR;
const BASE_API = `https://adventofcode.com/${YEAR}/day`;

const headers = {
  Accept: "text/plain",
  Cookie: SESSION,
};

async function getTextFile() {
  const apiUrl = `${BASE_API}/${DAY}/input`;

  try {
    // Make a GET request to the API
    const response = await axios.get(apiUrl, { headers });

    // Check if the request was successful (status code 200)
    if (response.status === 200) {
      // Save the text file content to a local file
      fs.writeFileSync(`./src/input/${YEAR}/input${DAY}.txt`, response.data);

      console.log("Text file has been successfully fetched and saved.");
    } else {
      console.error(
        `Failed to fetch text file. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching text file:", error.message);
  }

  process.exit(0);
}

// Call the function to fetch the text file
getTextFile();
