function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function generate_table(settings) {
  let table_container = document.getElementById("table-container");
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = "Year";

  tr.appendChild(th);
  thead.appendChild(tr);
  table.appendChild(thead);
  table_container.appendChild(table);
  console.log("here");
}