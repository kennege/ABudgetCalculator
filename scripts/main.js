let bw_pairs = [];

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
  let income = get_income();
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
  set_income(income);
  generateTallies();
  createBucketList();
  return False;
});

document.getElementById("reset_all").addEventListener("click", function(){
  deleteCookie();
  location.reload();
});

document.getElementById('income').focus();