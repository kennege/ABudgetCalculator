class BW_list {
  constructor(){
    this.ping();
  }

  create(bw_pairs) { 
    // generate bucket list for choosing weights
    let bl = get_by_id("bucketList");  
    let para = generate("div");
    while(bl.firstChild){
      bl.removeChild(bl.firstChild );
    }
    para.innerHTML = `<h3>Input weights so the sum equals 1 </h3>
                      <p id=weightpara style=text-align:center>Eg. Basics = 0.4</p>`;
    bl.appendChild(para);
    let div = generate('div');
    div.className = "well";
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      let node = generate("div");
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
      div.appendChild(node);    
      bl.appendChild(div);
    }
    let chosenBuckets = get_by_class("newBucket");
    for (let i=0;i<chosenBuckets.length;i++){
      chosenBuckets[i].style.listStyleType = "none";
    }
    $('#bucket_box').show();
    $('#done_button').fadeIn(1000);
  }

  pie_chart(bw_pairs) {
    show_by_id('pie_chart');
    let data = [];
    for (let i=0;i<bw_pairs.length;i++) {
      data.push({label: bw_pairs[i].bucket, data: bw_pairs[i].weight*10});
    }  
    var options = {
      series: {
          pie: {show: true}
              },
      legend: {
          show: false
      }
    };
    $.plot($("#pie_chart"), data, options);  
  }

  ping = () => console.log("I am a BW_list");
}