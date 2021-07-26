class Tally extends React.Component {
  constructor(props) {
     super(props) 
    this.state = {
      entries : [],
      item : "",
      value : 0
    };
    this.Entry = this.Entry.bind(this);
    this.reset = this.reset.bind(this);
  }

<<<<<<< HEAD
  getItem = (event) => {
    this.state.item = event.target.value;
  }
  getValue = (event) => {
    this.state.value = event.target.value;
  }

  Entry (props) {
    let value = props.props.entry.value;
    let item = props.props.entry.item;
    return (
      <li style={{color:"white"}}>
        <div> {item} : ${value}
          <button type="button" style={{color:'black', marginLeft:'5px'}} 
            className="btn-xs" onClick={() => this.deleteEntry(item)}>Delete</button>
        </div>
      </li>
    )
  }

  addEntry = (entry) => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""));
    let item = this.state.item;
    let value = this.state.value;
    this.state.entries.push({list: entry.name, key: entry.i, entry: {item: item, value: value}});
    this.setState({msg:""});
  }
  
  deleteEntry(item)  {
    let entries = [];
    for (let i=0;i<this.state.entries.length;i++){
      if (item !== this.state.entries[i].entry.item){
        entries.push(this.state.entries[i]);
      }
    }
    this.setState({entries:entries});
  }

  reset() {
    this.setState({entries:[]});
  }

  createTally(name, i) {
    let thisTally = [];
    let total = 0;
    let income = anIncome.get()/52;
    for (let i=0; i<this.state.entries.length; i++){
      if (name == this.state.entries[i].list) {
        total = total + parseFloat(this.state.entries[i].entry.value);
        thisTally.push(this.state.entries[i]);     
      }
=======
    create(bw_pairs){
    // generate optional tallies to aid in choosing weights
    let listBox = get_by_id("tally_box");
    listBox.style.display = "block";
    let listArea = get_by_id("tally_block");
    let listFlex = generate("article");
    listArea.className = "well";
    listFlex.className = "listflex";
    while(listArea.firstChild){
      listArea.removeChild(listArea.firstChild);
    }
    for (let i=0;i<bw_pairs.length;i++){
      let listDiv = generate('div'); 
      listDiv.className = "flexitem";
      let listName = generate('p');
      listName.innerHTML = bw_pairs[i].bucket + ": $0";
      listName.id = "title" + i;
      listName.style.color = "ivory";
      listDiv.appendChild(listName);
      let list = generate("ul");
      list.id = "tally" + i;
      let listEntry = generate("li");
      listEntry.className = "newentry";
      listEntry.innerHTML = `<div><input style='color:black' placeholder="Item" id='item${i}' size="10"> \
                            <input style='color:black' placeholder="$" id='val${i}' size="1"><button style='color:black; margin-left:5px;' type="button" \
                            class="btn-xs" onclick="${this.name}.add_entry('${i}','tally${i}')">Add</button></div>`;
      list.appendChild(listEntry);
      listDiv.appendChild(list);
      listFlex.appendChild(listDiv);     
    }
    listArea.appendChild(listFlex);

    $('#tally_div').fadeIn(1000);
    $('#tally_box').fadeIn(1000);
  }

  add_entry(liID,ulID){
    // add item to tally
    let list = get_by_id(ulID);
    let item = get_by_id('item'+liID).value;
    let value = get_by_id('val'+liID).value;
    let listEntry = generate("li");
    listEntry.id = item;
    listEntry.style.color = "ivory";
    listEntry.innerHTML = `<div> ${item}: $${value}<button type="button" style='color:black; margin-left:5px;' class="btn-xs"\
                          onclick="${this.name}.delete_entry('${item}','${value}','title${liID}')">Delete</button></div>`;
    list.insertBefore(listEntry,list.lastChild);

    // update total tally and weight
    let listPara = get_by_id('title'+liID);
    let listTitle = listPara.innerHTML;
    let ind = listTitle.indexOf("$");
    let currentTotal = parseFloat(listTitle.slice(ind+1));
    currentTotal = currentTotal + parseFloat(value);
    listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(anIncome.get()/52)).toFixed(2);
    
    // reset form
    get_by_id('item'+liID).value = "";
    get_by_id('val'+liID).value = "";
    return false;
  }

  delete_entry(liID,value,titleID) {
    let listPara = get_by_id(titleID);
    let listTitle = listPara.innerHTML;
    let ind = listTitle.indexOf("$");
    let currentTotal = parseFloat(listTitle.slice(ind+1));
   
    delete_by_id(liID);
    currentTotal = currentTotal - parseFloat(value);
    listPara.innerText = listTitle.slice(0,ind+1) + currentTotal + ", weight: " + (currentTotal/(anIncome.get()/52)).toFixed(2);
  }

  reset(bw_pairs){
    // remove items from tallies and reset
    for (let i=0;i<bw_pairs.length;i++){
      let tallyID = 'tally' + i;
      let titleID = 'title' + i;
      let tally = get_by_id(tallyID);
      while(tally.childNodes.length > 1){
        tally.removeChild(tally.firstChild);
      }
      let listName = get_by_id(titleID);
      listName.innerHTML = bw_pairs[i].bucket + ": $0";      
>>>>>>> working on plotting history
    }
    let tallyEntries = thisTally.map(entry => <this.Entry props={entry} key={entry.entry.item + i}/>);
    return (
      <div className="flexitem" key={i}>
        <p style={{color:"ivory",fontWeight:"bold"}}>{name}: ${total}, Weight: {(total/income).toFixed(2)}</p>
        <ul>
          {tallyEntries}
          <li className="newentry">
            <div key={"sdf"+{i}}>
              <input style={{color:'black'}} placeholder="Item" onChange={this.getItem} size="10"></input>
              <input style={{color:'black'}} placeholder="$" onChange={this.getValue} size="1"></input>
              <button style={{color:'black',marginLeft:'5px'}} type="button"
                className="btn-xs" onClick={() => this.addEntry({name, i})}>Add</button>
            </div>
          </li>          
        </ul>
      </div>
    )
  }

  render() {
    let tallies = [];
    let listNames = allBW_pairs.get().map(name => name.bucket);
    let i=0;
    for (let name of listNames){
      tallies.push(this.createTally(name, i));
      i++;
    }
    document.getElementById("tally_block").style.display = "block";
    return (
      <article>
        <div className="well listflex">{tallies}</div>
        <div><button className="btn" onClick={this.reset}>Reset</button></div>
      </article>
    )
  }
}