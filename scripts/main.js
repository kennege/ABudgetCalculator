function runScript(e) {
  if (e.keyCode == 13) {
      var tb = document.getElementById("income");
      return false;
  }
}

var amount = document.getElementById("income").value;
var period = "";

function setAmount(){
  amount = document.getElementById("income").value;
  document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period;   
}

document.getElementById("income").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {   
    setAmount();
    return true;
  }
});

function optionsCheckbox() {  
  var yearly = document.getElementById("yearly");  
  var monthly = document.getElementById("monthly");
  var fortnightly = document.getElementById("fortnightly");
  var weekly = document.getElementById("weekly");
  var daily = document.getElementById("daily");
  var boxes = {"year": yearly.checked, "month": monthly.checked, "fortnight": fortnightly.checked, "week": weekly.checked, "day":daily.checked};
  var true_count = 0;
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
        document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period;  
      }
    }
  } 
}  

function calculateIncome(){
  var yearly;
  var monthly;
  var fortnightly;
  var weekly;
  var daily;
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
  alert(yearly);
}