function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function generateTable(settings)
{
  let n = settings.get_num_years(); 
  let totals = settings.get_totals();
  let deposits = settings.get_deposits();
  let interests = settings.get_interests();
  let div = document.getElementById("table-container");
  div.innerHTML = "";
  let table = document.createElement("table");
  table.className = "table-responsive table-condensed table-striped";
  table.style.width = "100%";
  table.style.marginLeft = "auto";
  table.style.marginRight = "auto";
  
  let tableBody = document.createElement("tbody");
  let numRows = Math.ceil(n/5);
  let numCols = 5;
  for (let i=0; i<numRows; i++) {
    let rowH = tableBody.insertRow();
    rowH.style.backgroundColor = "#375e97";
    rowH.style.color = "white";
    let yearNum = 0;
    insertTableEntry(rowH, 0, 'Year');
    for (let j=0;j<numCols;j++) {
      yearNum = ((i*numCols)+(j+1));
      if (yearNum-1 < totals.length) {
        insertTableEntry(rowH, j+1, yearNum)
      }
    }
    let rowI = tableBody.insertRow();
    insertTableEntry(rowI, 0, 'Interest');
    for (let j=0;j<numCols;j++) {
      yearNum = ((i*numCols)+(j+1));
      if (yearNum-1 < totals.length) {
        insertTableEntry(rowI, j+1, "$"+commas(interests[yearNum-1].toFixed(2))); 
      }
    }
    let rowD = tableBody.insertRow();
    insertTableEntry(rowD, 0, 'Deposits');
    for (let j=0;j<numCols;j++) {
      yearNum = ((i*numCols)+(j+1));
      if (yearNum-1 < totals.length) {
        insertTableEntry(rowD, j+1, "$"+commas(deposits[yearNum-1].toFixed(2))); 
      }
    }
    let rowT = tableBody.insertRow();
    rowT.style.fontWeight = "bold"; 
    insertTableEntry(rowT, 0, 'Total');
    for (let j=0;j<numCols;j++) {
      yearNum = ((i*numCols)+(j+1));
      if (yearNum-1 < totals.length) {
        insertTableEntry(rowT, j+1, "$"+commas(totals[yearNum-1])); 
      }
    }
  }
  table.appendChild(tableBody);
  div.appendChild(table);
}