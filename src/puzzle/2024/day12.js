const { readFileAndCreateArray } = require("../../helper/readFile");

const coordinates = [
  [-1, 0], //up
  [1, 0], //down
  [0, 1], //right
  [0, -1], //left
];

function bfsFindPositions(grid, target, i, j) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const positions = [];
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
  ];

  // BFS function to traverse from a starting position
  function bfs(row, col) {
    const queue = [[row, col]];
    visited[row][col] = true;

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      positions.push([r, c]);

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        // Check boundaries, visited status, and target match
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !visited[nr][nc] &&
          grid[nr][nc] === target
        ) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  bfs(i, j);
  return positions; // Return positions of connected "A" values
}

/* function bfs(i, j, graph, startNode) {
  //console.log(graph);
  //if (i < 0 || j < 0 || i > graph.length || j > graph[i].length) return [];

  const visited = new Set(); // To keep track of visited nodes
  const queue = [`${i}-${j}`]; // Queue for BFS traversal
  const result = []; // To store the order of visited nodes

  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue the first element
    //console.log("node", node);

    if (!visited.has(node)) {
      visited.add(node); // Mark the node as visited
      result.push(node); // Add it to the result list

      // Enqueue all unvisited neighbors
      for (const [x, y] of coordinates) {
        const plot = graph[i + x]?.[j + y];
        if (plot && !visited.has(`${i + x}${j + y}`) && plot === startNode) {
          queue.push(`${i + x}-${j + y}`);
          console.log("graph", graph);

          result.push(...bfs(i + x, y + j, graph, plot));
        }
      }
    }
  }

  return result;
} */

const hasNeighbour = (i, j, garden) => {
  const variants = coordinates.map(([x, y]) => [x + i, j + y]);
  const test = variants.filter(([x, y]) => {
    return !garden.some(([a, b]) => x === a && y === b);
  });

  return test.length;
};

const day12 = async () => {
  const filePath = "./src/input/2024/input12.txt";
  const fileContent = await readFileAndCreateArray(filePath);

  const grid = fileContent.map((row) => row.split(""));

  const gardenIds = new Set();
  const gardens = [];

  const plot = grid[3][0];
  const plot2 = grid[0][1];
  //const result = bfs(0, 0, grid, plot);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const plot = grid[i][j];
      const result = bfsFindPositions(grid, plot, i, j);
      const [x, y] = result[0];

      if (
        gardens.some((garden) => {
          return garden.some(([a, b]) => {
            return result.some(([c, d]) => {
              return a === c && b === d;
            });
          });
        })
      ) {
        continue;
      }

      gardens.push(result);
      gardenIds.add(`${x}-${y}`);
    }
  }

  //console.log("gardens", gardens);

  let sum = 0;
  /*  gardens[0].forEach(([x, y]) => {
    sum += hasNeighbour(x, y, gardens[0]);
  }); */

  gardens.forEach((garden, index) => {
    let sum2 = 0;

    garden.forEach(([x, y]) => {
      sum2 += hasNeighbour(x, y, garden);
    });

    console.log("SUM2", sum2);

    sum += garden.length * sum2;

    if (index === 2) {
      console.log("garden.length", garden.length);
      console.log("sum2", sum2);
    }
  });
  console.log("sum", sum);
};

module.exports = { day12 };
