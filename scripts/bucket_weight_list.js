class BW_list {
  constructor(){
  }

    create() { 
    // generate bucket list for choosing weights
    let block = document.getElementById("bucket_box"); 
    block.style.display = "block" // display bucket/weight list box
    let bl = document.getElementById("bucketList");  
    let para = document.createElement("div");
    while(bl.firstChild){
      bl.removeChild(bl.firstChild );
    }
    para.innerHTML = "<p>Input weights so the sum equals 1. </p>";
    para.id = "weightpara";
    bl.appendChild(para);
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      if (!bw_pairs[i].bucket.includes("income")) {
        let node = document.createElement("div");
      if ((bw_pairs[i].weight == 0) || (isNaN(bw_pairs[i].weight)))
        {
          node.innerHTML = `<li class="newBucket"> <input name="chosenBucket" placeholder="Add weight. Eg. 0.3"> ${bw_pairs[i].bucket}</li>`; 
        }
        else
        {
          node.innerHTML = `<li class="newBucket"> <input name="chosenBucket" value="${bw_pairs[i].weight}"> ${bw_pairs[i].bucket}</li>`;
        }
        bl.appendChild(node);
      }
    }
    let chosenBuckets = document.getElementsByClassName("newBucket");
    for (let i=0;i<chosenBuckets.length;i++){
      chosenBuckets[i].style.listStyleType = "none";
    }
    if (!document.getElementById('donebutton')){
      let button = document.createElement("button");
      button.innerHTML = "Done";
      button.id = "donebutton";
      button.onclick = function() {aBW_list.save_bw_pairs()}
      block.appendChild(button);
    }
  }

  save_bw_pairs() {
  // save chosen weights for chosen buckets
  let totalweight = 0;
  let weights = document.getElementsByName("chosenBucket");  
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (!bw_pairs[i].bucket.includes("income")) {
      bw_pairs[i].weight = parseFloat(weights[i].value);
      totalweight = totalweight + parseFloat(weights[i].value);
    }
  }
  let para = document.getElementById("weightpara");
  para.innerText = "Weight sum = " + totalweight.toFixed(2);

  // check_bw_pairs();
  aCookie.delete();
  aCookie.set(bw_pairs);
  populateTable();
  drawPlot();
  }

  display() {
    document.getElementById('bucket_box').style.display = 'block';
  }
}

let aBW_list = new BW_list();