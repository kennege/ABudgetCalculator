function runScript(e) {
  if (e.keyCode == 13) {
      let tb = document.getElementById("income");
      return false;
  }
}

let amount = document.getElementById("income").value;
let period = "";
let taxOption = "";

function setAmount(){
  amount = document.getElementById("income").value;
  document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period + taxOption;   
}

document.getElementById("income").addEventListener("keyup", 
function(event) {
  if (event.keyCode === 13) {   
    setAmount();
    return true;
  }
});

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
        document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period + taxOption;  
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
        document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period + taxOption;  
      }
    }
  } 
}  

function calculateIncome(){
  let yearly;
  let monthly;
  let fortnightly;
  let weekly;
  let daily;
  setAmount();
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
  document.getElementById("yearly").innerHTML += " $" + Math.round(yearly);
  document.getElementById("monthly").innerHTML += " $" + Math.round(monthly);
  document.getElementById("fortnightly").innerHTML += " $" + Math.round(fortnightly);
  document.getElementById("weekly").innerHTML += " $" + Math.round(weekly);
  document.getElementById("daily").innerHTML += " $" + Math.round(daily);
}

income.focus();
