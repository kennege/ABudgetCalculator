function runScript(e) {
  if (e.keyCode == 13) {
      var tb = document.getElementById("income");
      return false;
  }
}

document.getElementById("income").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    var amount = document.getElementById("income").value;
    document.getElementById("setincome").innerHTML = "Your income is set to: $" + amount;
    return true;
  }
});

function optionsCheckbox() {  
  var yearly = document.getElementById("yearly");  
  var monthly = document.getElementById("monthly");
  var fortnightly = document.getElementById("fortnightly");
  var weekly = document.getElementById("weekly");
  var daily = document.getElementById("daily");
  if (yes.checked == true && no.checked == true){  
    return document.getElementById("error").innerHTML = "Please mark only one checkbox either Yes or No";  
  }  
  else if (yes.checked == true){  
    var y = document.getElementById("myCheck1").value;  
    return document.getElementById("result").innerHTML = y;   
  }   
  else if (no.checked == true){  
    var n = document.getElementById("myCheck2").value;  
    return document.getElementById("result").innerHTML = n;  
  }  
  else {  
    return document.getElementById("error").innerHTML = "*Please mark any of checkbox";  
  }  
}  
