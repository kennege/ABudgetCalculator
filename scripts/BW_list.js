class BW_list {
  constructor(){
    this.ping();
  }

  create(bw_pairs) { 
    this.bw_pairs = bw_pairs;
    // generate bucket list for choosing weights
    let bl = document.getElementById("bucketList");  
    let para = document.createElement("div");
    while(bl.firstChild){
      bl.removeChild(bl.firstChild );
    }
    para.innerHTML = `<h3>Input weights so the sum equals 1. </h3>
                      <p style=text-align:center>Eg. Basics = 0.4</p>`;
    para.id = "weightpara";
    bl.appendChild(para);
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      if (!bw_pairs[i].bucket.includes("income")) {
        let node = document.createElement("div");
        node.style.marginLeft = "20%"
        node.style.marginRight = "20%"
        if ((bw_pairs[i].weight == 0) || (isNaN(bw_pairs[i].weight)))
        {
          node.innerHTML = `<li class="newBucket list-group-item"> <input name="chosenBucket" 
          style='width:40px' id="${bw_pairs[i].bucket}"> ${bw_pairs[i].bucket}</li>`; 
        }
        else
        {
          node.innerHTML = `<li class="newBucket list-group-item"> <input name="chosenBucket" 
          style='width:40px' id="${bw_pairs[i].bucket}" value="${bw_pairs[i].weight}"> ${bw_pairs[i].bucket}</li>`;
        }
        bl.appendChild(node);
      }
    }
    let chosenBuckets = document.getElementsByClassName("newBucket");
    for (let i=0;i<chosenBuckets.length;i++){
      chosenBuckets[i].style.listStyleType = "none";
    }
    $('#bucket_box').fadeIn(1000);
    $('#done_button').fadeIn(1000);
  }

  ping = () => console.log("I am a BW_list");
}