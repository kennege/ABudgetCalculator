console.log("main loaded!")
let allBW_pairs = new BW_pairs();
let aResult = new Result();
let aBW_list = new BW_list();
let aTally = new Tally('aTally');
let anIncome = new Income();
let aCookie = new Cookie(anIncome, aTally, aBW_list, aResult, allBW_pairs);

document.getElementById('income').focus();

function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function displayBucketTree(){
  document.getElementById("tree_box").style.display = "block"; 
}

document.getElementById("tally_button").addEventListener("click", function(event){
  aTally.reset(allBW_pairs.get());
});

document.getElementById("bucket_button").addEventListener("click", function(event){
  let totalweight = 0;
  let new_bw_pairs = document.getElementsByName("chosenBucket");  
  let bw_pairs = [];
  for (let i=0;i<new_bw_pairs.length;i++){
    let pair = {
      bucket : new_bw_pairs[i].id,
      weight : parseFloat(new_bw_pairs[i].value)
    }
    bw_pairs.push(pair);
    totalweight = totalweight + parseFloat(new_bw_pairs[i].value);
  }
  let para = document.getElementById("weightpara");
  para.innerText = "Weight sum = " + totalweight.toFixed(2);

  bw_pairs = anIncome.set(anIncome.get(),bw_pairs);
  allBW_pairs.reset(bw_pairs);
  allBW_pairs.check();
  aCookie.delete();
  aCookie.set(allBW_pairs.get());
  aResult.populate_table(allBW_pairs.get());
  aResult.plot(allBW_pairs.get());
});

document.querySelectorAll('.new_box').forEach(item => {
  item.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      let lid = "l" + item.id.slice(1);
      let input = item.value;
      console.log(input);
      let li = document.getElementById(lid);
      let node = document.createElement("div");
      node.innerHTML = '<li> <input name="bucket" value="' + input + '" type="checkbox">' +  input + '</li>'; 
      li.appendChild(node);    
    }
  })
})

document.querySelectorAll('.income_ch').forEach(item => {
  item.addEventListener('click', event => {
    for (let i = 1;i <= 5; i++)
    {
      document.getElementById("o" + i).checked = false;
    }
    item.checked = true;
  })
})

document.querySelectorAll('.plot_ch').forEach(item => {
  item.addEventListener('click', event => {
    for (let i = 1;i <= 10; i++)
    {
        document.getElementById("ch" + i).checked = false;
    }
    item.checked = true;
    aResult.plot(allBW_pairs.get());
  })
})

document.getElementById("done_options").addEventListener("click", function(event){
  console.log(document.activeElement.id);
  let bw_pairs = allBW_pairs.get();
  bw_pairs = anIncome.calculate(bw_pairs);
  anIncome.write();
  anIncome.display();
  allBW_pairs.reset(bw_pairs);
  aCookie.delete();
  aCookie.set(allBW_pairs.get());
  displayBucketTree();
});

document.querySelector("#income").addEventListener('keypress', function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    let bw_pairs = allBW_pairs.get();
    bw_pairs = anIncome.calculate(bw_pairs);
    anIncome.write();
    anIncome.display();
    allBW_pairs.reset(bw_pairs);
    aCookie.delete();
    aCookie.set(allBW_pairs.get());
    displayBucketTree();
  }
});

document.getElementById("chosenbuckets").addEventListener("click", function(){
  // get chosen buckets from the bucket tree
  let checkboxes = document.getElementsByName('bucket');
  let income = anIncome.get();
  let bw_pairs = [];
  for (let i=0; i<checkboxes.length; i++) {
     if (checkboxes[i].checked) {
      let pair = {
         bucket: checkboxes[i].value,
         weight: 0
       };     
        bw_pairs.push(pair);
     }
  }
  bw_pairs = anIncome.set(income, bw_pairs);
  aTally.create(bw_pairs);
  aBW_list.create(bw_pairs);
  return false;
});

document.getElementById("reset_all").addEventListener("click", function(){
  aCookie.delete();
  console.clear();
  location.reload();
});
