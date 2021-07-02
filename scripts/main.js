let amount = document.getElementById("income").value;
let period = "";
let taxOption = "";
let bucketWeightPairs = [];
let yearly = 0;
let monthly = 0;
let fortnightly = 0;
let weekly = 0;
let daily = 0;

function optionsCheckbox() {  
  let yearly = document.getElementById("yearlybox");  
  let monthly = document.getElementById("monthlybox");
  let fortnightly = document.getElementById("fortnightlybox");
  let weekly = document.getElementById("weeklybox");
  let daily = document.getElementById("dailybox");
  let boxes = {"year": yearly.checked, "monthbox": monthly.checked, "fortnight": fortnightly.checked, "week": weekly.checked, "day":daily.checked};
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

function taxCheckbox() {  
  let beforeTax = document.getElementById("beforeTax");  
  let afterTax = document.getElementById("afterTax");
  let boxes = {"before tax": beforeTax.checked, "after tax": afterTax.checked};
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
        taxOption = ", " + key;
      }
    }
  } 
}  

function calculateIncome(){

  amount = document.getElementById("income").value;
  document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period + taxOption;   

  let b1 = document.getElementById("b1");
  b1.style.position = 'absolute';
  b1.style.right = '10px';
  b1.style.top = '250px';

  let b2 = document.getElementById("b2");
  b2.style.position = 'absolute';
  b2.style.right = '10px';
  b2.style.top = '540px';

  let amountF = parseFloat(amount);
  if (period == " per year"){
    yearly = amountF;
    monthly = amountF/12;
    fortnightly = amountF/26;
    weekly = amountF/52;
    daily = amountF/365;
  } else if (period == " per month"){
    yearly = amountF * 12;
    monthly = amountF;
    fortnightly = amountF/2;
    weekly = amountF/4;
    daily = amountF/30;
  } else if (period == " per fortnight"){
    yearly = amountF * 26;
    monthly = amountF * 2;
    fortnightly = amountF;
    weekly = amountF/2;
    daily = amountF/14;
  } else if (period == " per week"){
    yearly = amountF * 52;
    monthly = amountF * 4;
    fortnightly = amountF * 2;
    weekly = amountF;
    daily = amountF/7;
  } else if (period == " per day"){
    yearly = amountF * 365;
    monthly = amountF * 30;
    fortnightly = amountF * 14;
    weekly = amountF * 7;
    daily = amountF;
  } 
  document.getElementById("yearly").innerHTML = "Yearly: $" + yearly.toFixed(2);
  document.getElementById("monthly").innerHTML = "Monthly: $" + monthly.toFixed(2);
  document.getElementById("fortnightly").innerHTML = "Fortnightly: $" + fortnightly.toFixed(2);
  document.getElementById("weekly").innerHTML = "Weekly: $" + weekly.toFixed(2);
  document.getElementById("daily").innerHTML = "Daily: $" + daily.toFixed(2);
  document.getElementById("b2").style.display = "block";
  document.getElementById("b3").style.display = "block";
}

function addEntry(e,lid,fid) {
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

  let b3 = document.getElementById("b3");
  b3.style.position = 'absolute';
  b3.style.left = '10px';
  b3.style.top = '250px';

  let checkboxes = document.getElementsByName('bucket');
  let buckets = [];
  for (let i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
        buckets.push(checkboxes[i].value);
     }
  }
  generateLists(buckets);
  createBucketList(buckets)
  return False;
}

function createBucketList(buckets) { 
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
  bucketWeightPairs = []
  let b4 = document.getElementById("b4");
  b4.style.position = 'absolute';
  b4.style.right = '10px';
  b4.style.top = '790px';

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

function generateLists(buckets){
  let listArea = document.getElementById("listblock");
  listArea.style.display = "block";
  let listFlex = document.createElement("article");
  listFlex.style.display = "flex";
  listFlex.style.flexDirection = "row";
  listFlex.style.flexWrap = "wrap";
  listArea.style.width = "45%";
  for (let i=0;i<buckets.length;i++){
    let listBox=document.createElement('div'); 
    let listName=document.createElement('p');
    listName.innerHTML = buckets[i];
    listBox.appendChild(listName);
    listBox.id = buckets[i];
    let list = document.createElement("ul");
    list.id = "tally" + i;
    let listEntry = document.createElement("li");
    listEntry.className = "newentry";
    listEntry.innerHTML = `<div><input placeholder="Item" size="10"> \
                          <input placeholder="$" size="1"><button type="button" onclick="addTallyEntry('tally${i}')">Add</button></div>`;
    list.appendChild(listEntry);
    listBox.appendChild(list);
    listFlex.appendChild(listBox);
  }
  listArea.appendChild(listFlex);
  let button = document.createElement("button");
  button.innerHTML = "Ready/Skip";
  button.onclick = function() {populateTable()};
  listArea.appendChild(button);
}

function addTallyEntry(ulID){
  let list = document.getElementById(ulID);
  let listEntry = document.createElement("li");
  listEntry.className = "newentry";
  listEntry.innerHTML = `<div><input placeholder="Item" size="10"> \
  <input placeholder="$" size="1"><button type="button" onclick="addTallyEntry('${ulID}')">Add</button></div>`;
  list.appendChild(listEntry);
  return false;
}


function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function populateTable() {
  document.getElementById("tableblock").style.display = "block";
  let table = document.getElementById("tbody");
  table.innerHTML = "";
  for (let i=0;i<bucketWeightPairs.length;i++){
    let row = table.insertRow();

    insertTableEntry(row,0,bucketWeightPairs[i].bucket) // bucket name
    insertTableEntry(row,1,(daily * bucketWeightPairs[i].weight).toFixed(2)) // daily
    insertTableEntry(row,2,(weekly * bucketWeightPairs[i].weight).toFixed(2)) // weekly
    insertTableEntry(row,3,(fortnightly * bucketWeightPairs[i].weight).toFixed(2)) // fortnightly
    insertTableEntry(row,4,(monthly * bucketWeightPairs[i].weight).toFixed(2)) // monthly
    insertTableEntry(row,5,Math.round(yearly * bucketWeightPairs[i].weight)) // yearly
    insertTableEntry(row,6,Math.round(2 * yearly * bucketWeightPairs[i].weight)) // 2 yearly
    insertTableEntry(row,7,Math.round(5 * yearly * bucketWeightPairs[i].weight)) // 5 yearly
    insertTableEntry(row,8,Math.round(10 * yearly * bucketWeightPairs[i].weight)) // 10 yearly
    insertTableEntry(row,9,Math.round(20 * yearly * bucketWeightPairs[i].weight)) // 20 yearly
    insertTableEntry(row,10,Math.round(30 * yearly * bucketWeightPairs[i].weight)) // 30 yearly
  }
}

income.focus();
