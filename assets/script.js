const rows = 30;
const cols = 30;

const grid = document.getElementById("grid");

for (let i = 0; i < rows; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("td");
    cell.className = "dead";
    cell.addEventListener("click", function() {
      if (this.classList.contains("alive")) {
        this.classList.replace("alive", "dead");
      } else {
        this.classList.replace("dead", "alive");
      }
    }); 
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

function getNeighboringCells(row, col) {
  const neighbors = [];

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const neighborRow = row + dx;
    const neighborCol = col + dy;

    
    if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
      neighbors.push([neighborRow, neighborCol]);
    }
  }

  return neighbors;
}

function updateCellState(cell) {
  const aliveNeighbors = getAliveNeighborCount(cell);
  const isAlive = cell.classList.contains("alive");

  if (isAlive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
    cell.classList.replace("alive", "dead");
  } else if (!isAlive && aliveNeighbors === 3) {
    cell.classList.replace("dead", "alive");
  }
}

function getAliveNeighborCount(cell) {
  const [row, col] = getCellCoordinates(cell);
  const neighbors = getNeighboringCells(row, col);
  let aliveCount = 0;

  for (const [neighborRow, neighborCol] of neighbors) {
    const neighborCell = grid.rows[neighborRow].cells[neighborCol];
    if (neighborCell.classList.contains("alive")) {
      aliveCount++;
    }
  }

  return aliveCount;
}


function getCellCoordinates(cell) {
  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  return [row, col];
}

function playGameOfLife() {
  const cells = grid.getElementsByTagName("td");

  for (const cell of cells) {
    updateCellState(cell);
  }
}

setInterval(playGameOfLife, 3000);