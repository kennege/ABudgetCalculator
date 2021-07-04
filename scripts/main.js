let income = 0;
let bucketWeightPairs = [];

function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}
  
function optionsCheckbox(id) {  
  for (let i = 1;i <= 5; i++)
  {
    document.getElementById("o" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}  

function calculateIncome(e){
  if ((e.keyCode == 13) || (e.keyCode == null)) {
    for (let i = 1;i <= 5; i++)
    {
      if(document.getElementById("o" + i).checked){
        period = " per " + document.getElementById("o" + i).name;
      }
    }
    income = parseFloat(document.getElementById("income").value);
    document.getElementById("setincome").innerText = "Your income is set to: $" + commas(income.toFixed(2)) + period;
    switch(period) {
      case " per month":
        income = income * 12;
        break;
      case " per fortnight":
        income = income * 26;
        break;
      case " per week":
        income = income * 52;     
        break;
      case " per day":
        income = income * 365;
    } 

    // fill out income table
    let tab1 = document.getElementById("tbody1");
    tab1.innerHTML = "";
    let row1 = tab1.insertRow();
    insertTableEntry(row1, 0, "$" + commas((income / 365).toFixed(2))); // daily 
    insertTableEntry(row1, 1, "$" + commas((income / 52).toFixed(2))); // weekly 
    insertTableEntry(row1, 2, "$" + commas((income / 26).toFixed(2))); // fortnightly
    insertTableEntry(row1, 3, "$" + commas((income / 12).toFixed(2))); // monthly
    insertTableEntry(row1, 4, "$" + commas(Math.round(income))); // yearly 
    row1 = tab1.insertRow();
    let tab2 = document.getElementById("tbody2");
    tab2.innerHTML = "";
    let row2 = tab2.insertRow();
    insertTableEntry(row2, 0, "$" + commas(Math.round(2 * income))); 
    insertTableEntry(row2, 1, "$" + commas(Math.round(5 * income))); 
    insertTableEntry(row2, 2, "$" + commas(Math.round(10 * income))); 
    insertTableEntry(row2, 3, "$" + commas(Math.round(20 * income))); 
    insertTableEntry(row2, 4, "$" + commas(Math.round(30 * income))); 
    row2 = tab2.insertRow();    
    
    // display income table and block 3
    document.getElementById("t1div").style.display = "block"; // display income table
    document.getElementById("b3").style.display = "block"; // display bucket tree
    return false;
  }
}

function addEntry(e,lid,fid) {
  // add new buckets to the bucket tree
  if (e.keyCode == 13) {
    let li = document.getElementById(lid);
    let input = document.getElementById(fid).value;
    let node = document.createElement("div");
    node.innerHTML = '<li> <input name="bucket" value="' + input + '" type="checkbox">' +  input + '</li>'; 
    li.appendChild(node);    
    return false;
  }
}

document.getElementById("chosenbuckets").addEventListener("click", function(){
  // get chosen buckets from the bucket tree
  let checkboxes = document.getElementsByName('bucket');
  let buckets = [];
  for (let i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        buckets.push(checkboxes[i].value);
     }
  }
  generateTallies(buckets);
  createBucketList(buckets)
  return False;
});

function createBucketList(buckets) { 
  // generate bucket list for choosing weights
  let block = document.getElementById("b4"); 
  block.style.display = "block" // display bucket/weight list box
  let bl = document.getElementById("bucketList");  
  let para = document.createElement("div");
  while(bl.firstChild){
    bl.removeChild(bl.firstChild );
  }
  para.innerHTML = "<p>Input weights so the sum equals 1. </p>";
  para.id = "weightpara";
  bl.appendChild(para);
  for (let i=0; i<buckets.length; i++) {
    let node = document.createElement("div");
    node.innerHTML = `<li class="newBucket"> <input name="chosenBucket" placeholder="Add weight. Eg. 0.3"> ${buckets[i]}</li>`; 
    bl.appendChild(node);
  }
  let chosenBuckets = document.getElementsByClassName("newBucket");
  for (let i=0;i<chosenBuckets.length;i++){
    chosenBuckets[i].style.listStyleType = "none";
  }
  if (!document.getElementById('donebutton')){
    let button = document.createElement("button");
    button.innerHTML = "Done";
    button.id = "donebutton";
    button.onclick = function() {saveWeightBucketPairs(buckets)}
    block.appendChild(button);
  }
}

function saveWeightBucketPairs(buckets) {
  // save chosen weights for chosen buckets
  bucketWeightPairs = [];
  let totalweight = 0;
  let weights = document.getElementsByName("chosenBucket");  
  for (let i=0;i<weights.length;i++){
    let pair = {
      bucket: buckets[i],
      weight: parseFloat(weights[i].value)
    };
    totalweight = totalweight + parseFloat(weights[i].value);
    bucketWeightPairs.push(pair);
  }
  let para = document.getElementById("weightpara");
  para.innerText = "Weight sum = " + totalweight;
  populateTable();
  drawPlot();
}

function generateTallies(buckets){
  // generate optional tallies to aid in choosing weights
  let listBox = document.getElementById("b5");
  listBox.style.display = "block";
  let listArea = document.getElementById("listblock");
  let listFlex = document.createElement("article");
  listFlex.className = "listflex";
  while(listArea.firstChild){
    listArea.removeChild(listArea.firstChild);
  }
  for (let i=0;i<buckets.length;i++){
    let listBox=document.createElement('div'); 
    listBox.className = "flexitem";
    let listName=document.createElement('p');
    listName.innerHTML = buckets[i] + ": $0";
    listName.id = "title" + i;
    listName.style.color = "ivory";
    listBox.appendChild(listName);
    let list = document.createElement("ul");
    list.id = "tally" + i;
    let listEntry = document.createElement("li");

    listEntry.className = "newentry";
    listEntry.innerHTML = `<div><input placeholder="Item" id='item${i}' size="10"> \
                          <input placeholder="$" id='val${i}' size="1"><button type="button" \
                          onclick="addTallyEntry('${i}','tally${i}')">Add</button></div>`;
    list.appendChild(listEntry);
    listBox.appendChild(list);
    listFlex.appendChild(listBox);
  }
  listArea.appendChild(listFlex);

  if (!document.getElementById('reset')){
    let linebreak = document.createElement("br");
    listBox.appendChild(linebreak);
    let button = document.createElement("button");
    button.innerHTML = "Reset Tallies";
    button.id = "reset";
    button.onclick = function() {resetTallies(buckets)}
    listBox.appendChild(button);
  }
}

function resetTallies(buckets){
  for (let i=0;i<buckets.length;i++){
    let tallyID = 'tally' + i;
    let titleID = 'title' + i;
    let tally = document.getElementById(tallyID);
    while(tally.childNodes.length > 1){
      tally.removeChild(tally.firstChild);
    }
    let listName = document.getElementById(titleID);
    listName.innerHTML = buckets[i] + ": $0";
  }
}

function addTallyEntry(liID,ulID){
  // add item to tally
  let list = document.getElementById(ulID);
  let item = document.getElementById('item'+liID).value;
  let value = document.getElementById('val'+liID).value;
  let listEntry = document.createElement("li");
  listEntry.id = item;
  listEntry.style.color = "ivory";
  listEntry.innerHTML = `<div> ${item}: $${value}   <button type="button" \
                        onclick="deleteTallyEntry('${item}','${value}','title${liID}')">Delete</button></div>`;
  list.insertBefore(listEntry,list.lastChild);

  // update total tally and weight
  let listPara = document.getElementById('title'+liID);
  let listTitle = listPara.innerHTML;
  let ind = listTitle.indexOf("$");
  let currentTotal = parseFloat(listTitle.slice(ind+1));
  currentTotal = currentTotal + parseFloat(value);
  listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(income/52)).toFixed(2);
  
  // reset form
  document.getElementById('item'+liID).value = "";
  document.getElementById('val'+liID).value = "";
  return false;
}

function deleteTallyEntry(liID,value,titleID) {
  document.getElementById(liID).remove();
 
  // update total tally and weight
  let listPara = document.getElementById(titleID);
  listTitle = listPara.innerHTML;
  let ind = listTitle.indexOf("$");
  let currentTotal = parseFloat(listTitle.slice(ind+1));
  currentTotal = currentTotal - parseFloat(value);
  listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(income/52)).toFixed(2);
}

function populateTable() {
  // generate bucket/income table
  document.getElementById("tableblock").style.display = "block"; // display table box
  let table = document.getElementById("tbody");
  table.innerHTML = "";
  for (let i=0;i<bucketWeightPairs.length;i++){
    let row = table.insertRow();
    insertTableEntry(row, 0, bucketWeightPairs[i].bucket) // bucket name
    insertTableEntry(row, 1, commas(((income/365) * bucketWeightPairs[i].weight).toFixed(2))) // daily
    insertTableEntry(row, 2, commas(((income/52) * bucketWeightPairs[i].weight).toFixed(2))) // weekly
    insertTableEntry(row, 3, commas(((income/26) * bucketWeightPairs[i].weight).toFixed(2))) // fortnightly
    insertTableEntry(row, 4, commas(((income/12) * bucketWeightPairs[i].weight).toFixed(2))) // monthly
    insertTableEntry(row, 5, commas(Math.round(income * bucketWeightPairs[i].weight))) // yearly
    insertTableEntry(row, 6, commas(Math.round(2 * income * bucketWeightPairs[i].weight))) // 2 yearly
    insertTableEntry(row, 7, commas(Math.round(5 * income * bucketWeightPairs[i].weight))) // 5 yearly
    insertTableEntry(row, 8, commas(Math.round(10 * income * bucketWeightPairs[i].weight))) // 10 yearly
    insertTableEntry(row, 9, commas(Math.round(20 * income * bucketWeightPairs[i].weight))) // 20 yearly
    insertTableEntry(row, 10, commas(Math.round(30 * income * bucketWeightPairs[i].weight))) // 30 yearly
  }
}

function plotCheckbox(id) {
  for (let i = 1;i <= 10; i++)
  {
      document.getElementById("ch" + i).checked = false;
  }
  document.getElementById(id).checked = true;
  drawPlot();
}

function drawPlot() { 
  document.getElementById("plotbox").style.display = "block";  // display plot box
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
  let colours = ['black','blue','brown','red','aqua','crimson','cyan','pink','orange','yellow','purple','grey','green'];
  for (let i=0;i<Object.keys(bucketWeightPairs).length;i++){
    let pair = {};
    pair["label"] = bucketWeightPairs[i]["bucket"]
    pair["data"] = [];
    pair["data"].push([0,0]);
    pair["data"].push([unit, bucketWeightPairs[i]["weight"] * multiplier * income]);
    pair["points"] = {symbol: "circle"};
    pair["color"] = colours[i];
    data.push(pair);
  }
  let xlabel = document.head.appendChild(document.createElement('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${time})'`;
  $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
}

income.focus();
