let amount = document.getElementById("income").value;
let period = "";
let bucketWeightPairs = [];
let yearly = 0;
let monthly = 0;
let fortnightly = 0;
let weekly = 0;
let daily = 0;

function optionsCheckbox() {  
  let yearlyCh = document.getElementById("yearlybox");  
  let monthlyCh = document.getElementById("monthlybox");
  let fortnightlyCh = document.getElementById("fortnightlybox");
  let weeklyCh = document.getElementById("weeklybox");
  let dailyCh = document.getElementById("dailybox");
  let boxes = {"year": yearlyCh.checked, "monthbox": monthlyCh.checked, "fortnight": fortnightlyCh.checked, "week": weeklyCh.checked, "day":dailyCh.checked};
  let true_count = 0;
  for (const [key, value] of Object.entries(boxes)) 
  { 
    if (value){
      true_count +=1;
    }
  }
  if (true_count > 1){
    alert("Please select only one box.")
  }
  else if (true_count === 1){
    for (const [key, value] of Object.entries(boxes)) 
    { 
      if (value){
        period = " per " + key;
      }
    }
  } 
}  

function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}
  
function calculateIncome(e){
  if ((e.keyCode == 13) || (e.keyCode == null)) {
    amount = document.getElementById("income").value;
    let amountF = parseFloat(amount);
    switch(period) {
      case " per year":
        yearly = amountF;
        monthly = amountF/12;
        fortnightly = amountF/26;
        weekly = amountF/52;
        daily = amountF/365;
        break;
      case " per month":
        yearly = amountF * 12;
        monthly = amountF;
        fortnightly = amountF/2;
        weekly = amountF/4;
        daily = amountF/30;
        break;
      case " per fortnight":
        yearly = amountF * 26;
        monthly = amountF * 2;
        fortnightly = amountF;
        weekly = amountF/2;
        daily = amountF/14;
        break;
      case " per week":
        yearly = amountF * 52;
        monthly = amountF * 4;
        fortnightly = amountF * 2;
        weekly = amountF;
        daily = amountF/7;
        break;
      case " per day":
        yearly = amountF * 365;
        monthly = amountF * 30;
        fortnightly = amountF * 14;
        weekly = amountF * 7;
        daily = amountF;
    } 

    // fill out income table
    document.getElementById("setincome").innerHTML = "Your income is set to:"
    let tab = document.getElementById("tbody1");
    tab.innerHTML = "";
    let row = tab.insertRow();
    insertTableEntry(row, 0, "$" + commas(daily.toFixed(2))); 
    insertTableEntry(row, 1, "$" + commas(weekly.toFixed(2))); 
    insertTableEntry(row, 2, "$" + commas(fortnightly.toFixed(2))); 
    insertTableEntry(row, 3, "$" + commas(monthly.toFixed(2))); 
    insertTableEntry(row, 4, "$" + commas(yearly.toFixed(2))); 
    
    // display income table and block 3
    document.getElementById("t1div").style.display = "block";
    document.getElementById("b3").style.display = "block";
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

function getBuckets() {
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
}

function createBucketList(buckets) { 
  // generate bucket list for choosing weights
  document.getElementById("b4").style.display = "block";
  let bl = document.getElementById("bucketList");  
  let para = document.createElement("div");
  while(bl.firstChild){
    bl.removeChild(bl.firstChild );
  }
  para.innerHTML = "<p>Input weights so the total equals 1. </p>";
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
  let button = document.createElement("button");
  button.innerHTML = "Done";
  button.onclick = function() {saveWeightBucketPairs(buckets)}
  bl.appendChild(button);
}

function saveWeightBucketPairs(buckets) {
  // save chosen weights for chosen buckets
  bucketWeightPairs = []
  let weights = document.getElementsByName("chosenBucket");  
  for (let i=0;i<weights.length;i++){
    let pair = {
      bucket: buckets[i],
      weight: parseFloat(weights[i].value)
    };
    bucketWeightPairs.push(pair);
  }
  populateTable();
}

function generateTallies(buckets){
  // generate optional tallies to aid in choosing weights
  let listBox = document.getElementById("b5");
  listBox.style.display = "block";
  let listArea = document.getElementById("listblock");
  let listFlex = document.createElement("article");
  listFlex.style.display = "flex";
  listFlex.style.flexDirection = "row";
  listFlex.style.flexWrap = "wrap";
  listArea.style.width = "90%";
  while(listArea.firstChild){
    listArea.removeChild(listArea.firstChild);
  }
  for (let i=0;i<buckets.length;i++){
    let listBox=document.createElement('div'); 
    listBox.style.backgroundColor = "#375e97";
    listBox.style.padding = "3px";
    listBox.style.right = "5px";
    listBox.style.borderRadius = "5px";
    listBox.style.boxShadow = "2px 4px #888888"
    let listName=document.createElement('p');
    listName.innerHTML = buckets[i] + ": $0";
    listBox.appendChild(listName);
    let list = document.createElement("ul");
    list.id = "tally" + i;
    let listEntry = document.createElement("li");
    listEntry.style.listStyle = "decimal-inside";
    listEntry.className = "newentry";
    listEntry.innerHTML = `<div><input placeholder="Item" id='item${i}' size="10"> \
                          <input placeholder="$" id='val${i}' size="1"><button type="button" \
                          onclick="addTallyEntry('${i}','tally${i}')">Add</button></div>`;
    list.appendChild(listEntry);
    listBox.appendChild(list);
    listFlex.appendChild(listBox);
  }
  listArea.appendChild(listFlex);
}

function addTallyEntry(liID,ulID){
  // add item to tally
  let list = document.getElementById(ulID);
  let item = document.getElementById('item'+liID).value;
  let value = document.getElementById('val'+liID).value;
  let listEntry = document.createElement("li");
  listEntry.innerHTML = item + ': $' + value;
  list.insertBefore(listEntry,list.firstChild);

  // update total tally and weight
  let listPara = document.getElementById('title'+liID);
  let listTitle = listPara.innerHTML;
  let ind = listTitle.indexOf("$");
  let currentTotal = parseFloat(listTitle.slice(ind+1));
  currentTotal = currentTotal + parseFloat(value);
  listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/fortnightly).toFixed(2);

  // reset form
  document.getElementById('item'+liID).value = "";
  document.getElementById('val'+liID).value = "";
  return false;
}

function populateTable() {
  // generate bucket/income table
  document.getElementById("tableblock").style.display = "block";
  let table = document.getElementById("tbody");
  table.innerHTML = "";
  for (let i=0;i<bucketWeightPairs.length;i++){
    let row = table.insertRow();
    insertTableEntry(row, 0, bucketWeightPairs[i].bucket) // bucket name
    insertTableEntry(row, 1, commas((daily * bucketWeightPairs[i].weight).toFixed(2))) // daily
    insertTableEntry(row, 2, commas((weekly * bucketWeightPairs[i].weight).toFixed(2))) // weekly
    insertTableEntry(row, 3, commas((fortnightly * bucketWeightPairs[i].weight).toFixed(2))) // fortnightly
    insertTableEntry(row, 4, commas(Math.round(monthly * bucketWeightPairs[i].weight))) // monthly
    insertTableEntry(row, 5, commas(Math.round(yearly * bucketWeightPairs[i].weight))) // yearly
    insertTableEntry(row, 6, commas(Math.round(2 * yearly * bucketWeightPairs[i].weight))) // 2 yearly
    insertTableEntry(row, 7, commas(Math.round(5 * yearly * bucketWeightPairs[i].weight))) // 5 yearly
    insertTableEntry(row, 8, commas(Math.round(10 * yearly * bucketWeightPairs[i].weight))) // 10 yearly
    insertTableEntry(row, 9, commas(Math.round(20 * yearly * bucketWeightPairs[i].weight))) // 20 yearly
    insertTableEntry(row, 10, commas(Math.round(30 * yearly * bucketWeightPairs[i].weight))) // 30 yearly
  }
}

income.focus();
