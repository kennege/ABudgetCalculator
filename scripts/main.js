function runScript(e) {
  if (e.keyCode == 13) {
      var tb = document.getElementById("income");
      return false;
  }
}

var amount = document.getElementById("income").value;
var period = "";

document.getElementById("income").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {   
    amount = document.getElementById("income").value;
    document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount + period;   
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

