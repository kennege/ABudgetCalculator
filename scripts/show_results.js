function populateTable() {
  // generate bucket/income table
  document.getElementById("table_box").style.display = "block"; // display table box
  let table = document.getElementById("tbody");
  table.innerHTML = "";
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (!bw_pairs[i].bucket.includes("income")) {
      let row = table.insertRow();
      insertTableEntry(row, 0, bw_pairs[i].bucket) // bucket name
      for (let j=0;j<10;j++){
        insertTableEntry(row, j+1, (anIncome.convert(bw_pairs[i].weight)[j])) 
      }
    }
  }
  let table_total = document.getElementById('total');
  table_total.innerHTML = "";
  row = table_total.insertRow();
  insertTableEntry(row, 0, 'Total');
  for (let j=0;j<10;j++){
    insertTableEntry(row, j+1, (anIncome.convert(1)[j])) 
  }
}

function clearTable() {

}


function plotCheckbox(id) {
  // get latest checkbox and plot
  for (let i = 1;i <= 10; i++)
  {
      document.getElementById("ch" + i).checked = false;
  }
  document.getElementById(id).checked = true;
  drawPlot();
}

function drawPlot() { 
  document.getElementById("plot_box").style.display = "block";  // display plot box
  let unit = 1;
  let time = "";
  let multiplier = 1;
  for (let i=1;i<=10;i++)
  {
    if (document.getElementById("ch" + i).checked) {
      time = document.getElementById("ch" + i).name;
      unit = parseFloat(document.getElementById("ch" + i).value);
      multiplier = eval(document.getElementById("ch" + i).title);
    }
  }
  let data = [];
  let mult = 0;
  let colours = ['black','blue','brown','red','aqua','crimson','cyan','pink','orange','yellow','purple','grey','green'];
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (!bw_pairs[i].bucket.includes("income")) {
      if ((i+1) % (colours.length+1) == 0){
        mult+=colours.length;
      }
      let pair = {};
      pair["label"] = bw_pairs[i]["bucket"];
      pair["data"] = [];
      pair["data"].push([0,0]);
      pair["data"].push([unit, bw_pairs[i]["weight"] * multiplier * anIncome.get()]);
      pair["points"] = {symbol: "circle"};
      pair["color"] = colours[i - mult];
      data.push(pair);
    }
  }
  let xlabel = document.head.appendChild(document.createElement('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${time})'`;
  $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});

  document.getElementById("reset_all").style.display = "block";
}