const yearElement = document.querySelector(".year");
const gridYearsElement = document.querySelector(".grid-years");
const daysLeftElement = document.querySelector(".days-left");
const isLeapYear = new Date().getFullYear() % 4;
const countYear = !isLeapYear ? 366 : 365;

function daysLeftCounts() {
  const today = new Date();
  const initYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - initYear.getTime();
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  return daysLeft;
}

function createGrid(numberOfCells) {
  if (!gridYearsElement) return;
  const clientWidth = gridYearsElement.clientWidth;
  const clientHeight = gridYearsElement.clientHeight;

  const columns = Math.floor(Math.sqrt(numberOfCells));
  const rows = Math.ceil(numberOfCells / columns);

  const cellWidth = clientWidth / columns;
  const cellHeight = clientHeight / rows;

  gridYearsElement.style.setProperty("--columns", columns);
  gridYearsElement.style.setProperty("--rows", rows);
  gridYearsElement.style.setProperty("--cell-width", `${cellWidth}px`);
  gridYearsElement.style.setProperty("--cell-height", `${cellHeight}px`);

  gridYearsElement.innerHTML = "";
  for (let i = 0; i < numberOfCells; i++) {
    const div = document.createElement("div");
    div.className = "grid-item flex justify-center items-center";
    const icon = document.createElement("i");
    icon.className = `ph-fill ${colors(i + 1)} text-sm animate-pulse`;
    div.appendChild(icon);
    gridYearsElement.appendChild(div);
  }
}

function colors(i) {
  if (i <= daysLeftCounts()) {
    return "ph-circle text-gray-300";
  }
  if (i === 27) {
    return "ph-seal text-green-200";
  }
  return "ph-circle text-gray-800";
}

if (yearElement && daysLeftElement) {
  const daysLeft = countYear - daysLeftCounts();
  yearElement.innerHTML = new Date().getFullYear().toString();
  daysLeftElement.innerHTML = daysLeft.toString();
}

createGrid(countYear);
if (daysLeftCounts() === 27) alert("Parabéns");
