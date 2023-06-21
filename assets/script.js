const rows = 10;
const cols = 10;

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