let table;
let smileImg;

function preload() {
  // Carico il dataset e l'immagine
  table = loadTable("assets/dataset.csv", "csv", "header");
  smileImg = loadImage("smile.png");
}

function setup() {
  let outerPadding = 20;
  let padding = 15;
  let itemSize = 80; // INGRANDITO

  // Calcolo numero di colonne che entrano in una riga
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  let rows = ceil(table.getRowCount() / cols);

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

  // Creo il canvas
  createCanvas(windowWidth, totalHeight);
  background('white');

  console.log("Colonne:", cols, "Rows:", rows);

  let colCount = 0;
  let rowCount = 0;

  // Pre-calcolo min/max per scaling
  let allValues = table.getColumn("column0").map(Number);
  let minValues = min(allValues);
  let maxValues = max(allValues);

  let allValues2 = table.getColumn("column2").map(Number);
  let minValues2 = min(allValues2);
  let maxValues2 = max(allValues2);

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    console.log("Riga numero:", rowNumber);

    let data = table.getRow(rowNumber).obj;
    console.log(data);

    // Valore per la dimensione
    let myValue = Number(data["column0"]);
    let scaledValues = map(myValue, minValues, maxValues, 10, itemSize); // MIN VALUE INGRANDITO

    // Valore per il colore
    let value2 = Number(data["column2"]);
    let value2Mapped = map(value2, minValues2, maxValues2, 0, 1);

    let c1 = color("#d8a4fbff");
    let c2 = color("#b4ffe6ff");
    let mappedColor = lerpColor(c1, c2, value2Mapped);

    fill(mappedColor);

    // Calcolo posizione del blocco
    let baseX = outerPadding + colCount * (itemSize + padding);
    let baseY = outerPadding + rowCount * (itemSize + padding);

    // Calcolo offset per centrare lo smile nel blocchetto
    let xOffset = (itemSize - scaledValues) / 2;
    let yOffset = (itemSize - scaledValues) / 2;

    // Posizione finale dell'immagine
    let xPos = baseX + xOffset;
    let yPos = baseY + yOffset;

    drawSmile(xPos, yPos, scaledValues, mappedColor);

    // Avanza colonna
    colCount++;

    // Se raggiungo la fine della riga, passo alla successiva
    if (colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}

// Disegno lo smile centrato
function drawSmile(x, y, size, col) {
  push();
  translate(x + size / 2, y + size / 2);

  fill(col);
  stroke(0);
  strokeWeight(1);
  ellipse(0, 0, size); // faccia

  fill(0);
  let eyeOffset = size * 0.25;
  let eyeSize = size * 0.1;
  ellipse(-eyeOffset, -eyeOffset, eyeSize); // occhio sinistro
  ellipse(eyeOffset, -eyeOffset, eyeSize);  // occhio destro

  noFill();
  stroke(0);
  strokeWeight(2);
  let smileWidth = size * 0.6;
  let smileHeight = size * 0.3;
  arc(0, 0, smileWidth, smileHeight, 0, PI); // sorriso

  pop();
}

function draw() {
  // Non disegniamo nulla qui
}
