class Tally {
  constructor(name){
    this.ping();
    this.name = name;
  }

    create(bw_pairs){
    // generate optional tallies to aid in choosing weights
    let listBox = document.getElementById("tally_box");
    listBox.style.display = "block";
    let listArea = document.getElementById("tally_block");
    let listFlex = document.createElement("article");
    listFlex.className = "listflex";
    while(listArea.firstChild){
      listArea.removeChild(listArea.firstChild);
    }
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      if (!bw_pairs[i].bucket.includes("income")) {
        let listDiv=document.createElement('div'); 
        listDiv.className = "flexitem";
        let listName=document.createElement('p');
        listName.innerHTML = bw_pairs[i].bucket + ": $0";
        listName.id = "title" + i;
        listName.style.color = "ivory";
        listDiv.appendChild(listName);
        let list = document.createElement("ul");
        list.id = "tally" + i;
        let listEntry = document.createElement("li");
        listEntry.className = "newentry";
        listEntry.innerHTML = `<div><input placeholder="Item" id='item${i}' size="10"> \
                              <input placeholder="$" id='val${i}' size="1"><button type="button" \
                              onclick="${this.name}.add_entry('${i}','tally${i}')">Add</button></div>`;
        list.appendChild(listEntry);
        listDiv.appendChild(list);
        listFlex.appendChild(listDiv);
      }
    }
    listArea.appendChild(listFlex);

    document.getElementById('tally_div').style.display = 'block';
    document.getElementById('tally_box').style.display = 'block';
  }

  add_entry(liID,ulID){
    // add item to tally
    let list = document.getElementById(ulID);
    let item = document.getElementById('item'+liID).value;
    let value = document.getElementById('val'+liID).value;
    let listEntry = document.createElement("li");
    listEntry.id = item;
    listEntry.style.color = "ivory";
    listEntry.innerHTML = `<div> ${item}: $${value}   <button type="button" \
                          onclick="${this.name}.delete_entry('${item}','${value}','title${liID}')">Delete</button></div>`;
    list.insertBefore(listEntry,list.lastChild);

    // update total tally and weight
    let listPara = document.getElementById('title'+liID);
    let listTitle = listPara.innerHTML;
    let ind = listTitle.indexOf("$");
    let currentTotal = parseFloat(listTitle.slice(ind+1));
    currentTotal = currentTotal + parseFloat(value);
    listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(anIncome.get()/52)).toFixed(2);
    
    // reset form
    document.getElementById('item'+liID).value = "";
    document.getElementById('val'+liID).value = "";
    return false;
  }

  delete_entry(liID,value,titleID) {
    document.getElementById(liID).remove();
    let listPara = document.getElementById(titleID);
    let listTitle = listPara.innerHTML;
    let ind = listTitle.indexOf("$");
    let currentTotal = parseFloat(listTitle.slice(ind+1));
    currentTotal = currentTotal - parseFloat(value);
    listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(anIncome.get()/52)).toFixed(2);
  }

  reset(bw_pairs){
    // remove items from tallies and reset
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      if (!bw_pairs[i].bucket.includes("income")) {
        let tallyID = 'tally' + i;
        let titleID = 'title' + i;
        let tally = document.getElementById(tallyID);
        while(tally.childNodes.length > 1){
          tally.removeChild(tally.firstChild);
        }
        let listName = document.getElementById(titleID);
        listName.innerHTML = bw_pairs[i].bucket + ": $0";
      }
    }
  }

  ping() {
    console.log("I am a Tally!");
  }
}
