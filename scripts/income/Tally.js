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