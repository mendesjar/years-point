const year = document.querySelector(".year");
const gridYears = document.querySelector(".grid-years");
const daysLeftElement = document.querySelector(".days-left");
const isLeapYear = new Date().getFullYear() % 4;
const countYear = !isLeapYear ? 366 : 365;
let columns = 0,
  rows = 0;

function daysLeftCounts() {
  const today = new Date();
  const initYear = new Date(today.getFullYear(), 0, 0);
  const diff = today - initYear;
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  return daysLeft;
}

year.innerHTML = new Date().getFullYear();
const daysLeft = countYear - daysLeftCounts();
daysLeftElement.innerHTML = daysLeft;

function createGrid(numberOfCells) {
  if (!numberOfCells) return;
  const clientWidth = gridYears.clientWidth;
  const clientHeight = gridYears.clientHeight;

  const columns = Math.floor(Math.sqrt(numberOfCells));
  const rows = Math.ceil(numberOfCells / columns);

  const cellWidth = clientWidth / columns;
  const cellHeight = clientHeight / rows;

  gridYears.style.gridTemplateColumns = `repeat(${columns}, ${cellWidth}px)`;
  gridYears.style.gridTemplateRows = `repeat(${rows}, ${cellHeight}px)`;
  gridYears.style.setProperty("--columns", columns);
  gridYears.style.setProperty("--rows", rows);

  gridYears.innerHTML = "";
  for (let i = 0; i < numberOfCells; i++) {
    const div = document.createElement("div");
    div.className = "grid-item flex justify-center items-center";
    const icon = document.createElement("i");
    icon.className = `ph-fill ph-circle ${colors(i + 1)} text-sm`;
    div.appendChild(icon);
    gridYears.appendChild(div);
  }
}

function colors(i) {
  if (i <= daysLeftCounts()) {
    return "text-gray-300";
  }
  if (i === 27) {
    return "text-green-200";
  }
  return "text-gray-800";
}

createGrid(countYear);
