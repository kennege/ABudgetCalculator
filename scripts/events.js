let bw_pairs = [];

function calculateIncome(e){ // change to event listener
  if ((e.keyCode == 13) || (e.keyCode == null)) {
    for (let i = 1;i <= 5; i++)
    {
      if(document.getElementById("o" + i).checked){
        period = " per " + document.getElementById("o" + i).name;
      }
    }
    let income = anIncome.read();
    document.getElementById("setincome").innerText = "Your income is set to: $" + commas(income.toFixed(2)) + period;
    switch(period) {
      case " per month":
        anIncome.set(income * 12);
        break;
      case " per fortnight":
        anIncome.set(income * 26);
        break;
      case " per week":
        anIncome.set(income * 52);     
        break;
      case " per day":
        anIncome.set(income * 365);
    } 
    // fill out income table
    aCookie.delete();
    aCookie.set(bw_pairs);

    anIncome.display();
    document.getElementById("income_table").style.display = "block"; // display income table
    document.getElementById("tree_box").style.display = "block"; // display bucket tree
    return false;
  }
}

function optionsCheckbox(id) { 
  // only let one income period option to be checked 
  for (let i = 1;i <= 5; i++)
  {
    document.getElementById("o" + i).checked = false;
  }
  document.getElementById(id).checked = true;
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
  let income = anIncome.get();
  bw_pairs = [];
  for (let i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
      let pair = {
         bucket: checkboxes[i].value,
         weight: 0
       };     
        bw_pairs.push(pair);
     }
  }
  anIncome.set(income);
  aTally.generate(bw_pairs);
  aTally.display();
  aBW_list.create();
  aBW_list.display();
  return False;
});

document.getElementById("reset_all").addEventListener("click", function(){
  aCookie.delete();
  location.reload();
});

