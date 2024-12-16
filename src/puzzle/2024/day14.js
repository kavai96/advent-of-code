const { readFileAndCreateArray } = require("../../helper/readFile");

const coordinates = [
  [-1, 0], //up
  [1, 0], //down
  [0, 1], //right
  [0, -1], //left
];

const print = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
};

const createGrid = (tall, wide, nodes) => {
  const grid = Array.from({ length: tall }, () => Array(wide).fill("."));

  nodes.forEach((node) => {
    const [j, i] = node;
    grid[i][j] = "#";
  });

  return grid;
};

const day14 = async () => {
  const filePath = "./src/input/2024/input14.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const nodes = fileContent.map((row) => {
    return row.match(/-?\d+/g).map(Number);
  });

  const wide = 101;
  const tall = 103;

  const middleX = (wide - 1) / 2;
  const middleY = (tall - 1) / 2;

  let nodesAfter100Visit = [];

  for (let visits = 0; visits < 10000; visits++) {
    if (visits === 100) {
      nodesAfter100Visit = [...nodes];
    }

    nodes.forEach((node, index) => {
      const [posX, posY, vX, vY] = node;
      let newPosX = posX + vX;
      let newPosY = posY + vY;

      if (newPosX >= wide) {
        newPosX = newPosX - wide;
      }

      if (newPosX < 0) {
        newPosX = wide + newPosX;
      }

      if (newPosY >= tall) {
        newPosY = newPosY - tall;
      }

      if (newPosY < 0) {
        newPosY = tall + newPosY;
      }

      nodes[index] = [newPosX, newPosY, vX, vY];
    });

    const grid = createGrid(tall, wide, nodes);

    const visited = new Set();

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "#" && !visited.has(`${i}-${j}`)) {
          const queue = [[i, j]];
          let components = 0;

          while (queue.length > 0) {
            components++;
            const [x, y] = queue.shift();

            if (visited.has(`${x}-${y}`)) {
              continue;
            }

            visited.add(`${x}-${y}`);

            for (const [dx, dy] of coordinates) {
              const newX = x + dx;
              const newY = y + dy;

              if (
                newX >= 0 &&
                newX < tall &&
                newY >= 0 &&
                newY < wide &&
                grid[newX][newY] === "#"
              ) {
                queue.push([newX, newY]);
              }
            }
          }

          if (components > 100) {
            console.log("part2", visits + 1);
            break;
          }
        }
      }
    }
  }

  const result = nodesAfter100Visit.reduce(
    (prev, node) => {
      const [x, y] = node;
      if (x < middleX && y < middleY) {
        prev.q1++;
      }
      if (x > middleX && y < middleY) {
        prev.q2++;
      }
      if (x < middleX && y > middleY) {
        prev.q3++;
      }
      if (x > middleX && y > middleY) {
        prev.q4++;
      }

      return prev;
    },
    {
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
    }
  );

  console.log("part1", result.q1 * result.q2 * result.q3 * result.q4);
};

module.exports = { day14 };
