let table;

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv", "csv", "header"); //la variabile tbale deve contenere tutto ciò che arriva dal dataset
}


function setup() {
  //controllo se ho caricato i dati
  //console.log(table); //scrivi sulla console del browser il contenuto della variabile table

  let outerPadding = 20;
  let padding = 10;
  let itemSize = 30;

  //calcolo numero colonne
  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding)); //floor serve per arrotondare per difetto
 
  let rows = ceil(table.getRowCount() / cols); //ceil arrotonda per eccesso

  let totalHeight = outerPadding * 2 + rows *itemSize + (rows - 1)* padding;

  //creo il Canvas
  createCanvas(windowWidth, totalHeight);
  
  background('coral');

  console.log("colonne:", cols, "rows:", rows);

  let colCount = 0; 
  let rowCount = 0; 
 
  for(let rowNumber=0; rowNumber < table.getRowCount(); rowNumber++){
    console.log("riga numero:", rowNumber);

    //carico i dati della riga
    let data = table.getRow (rowNumber).obj;
    console.log(data);

   // prendo valore per dimensione
   let myValue = data["column0"];

   // calcolo minimo e massimo
   let allValues = table.getColumn("column0");
   let minValues = min(allValues);
   let maxValues = max(allValues);
   let scaledValues = map(myValue, minValues, maxValues, 1, 30);

   // seconda variabile per il colore
   let value2 = data["column2"];
   let allvalues2 = table.getColumn("column2");
   let minvalues2 = min(allvalues2);
   let maxvalues2 = max(allValues);
   let value2Mapped = map(value2, minvalues2, maxvalues2, 0, 1);

   let c1 = color("red");
   let c2 = color("yellow");

   let mappedColor = lerpColor(c1, c2, value2Mapped);

   fill(mappedColor);

    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    rect(xPos, yPos, scaledValues, scaledValues);

    // aumenta colcont
    colCount++;

    // controllo se sono a fine riga
    if (colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  } 


}

function draw() {
  // put drawing code here
}