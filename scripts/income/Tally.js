class Tally extends React.Component {
  constructor(props) {
     super(props) 
     this.myStyle = {
      color: "ivory",
      fontWeight: "bold",
    };
  }

  addTallyEntry() {

  }
  
  deleteTallyEntry() {

  }

  reset() {

  }

  createTally(name, i) {
    console.log("tally: " + name + " i: " + i);
    return (
      <div className="flexitem" key={i}>
        <p style={{color:"ivory",fontWeight:"bold"}}>{name}: $0</p>
        <ul id={"tally"+i}>
          <li className="newentry">
          <div>
            <input style={{color:'black'}} placeholder="Item" id={'item'+{i}} size="10"></input>
            <input style={{color:'black'}} placeholder="$" id={'val'+{i}} size="1"></input>
            <button style={{color:'black',marginLeft:'5px'}} type="button" 
              className="btn-xs" onClick={this.addTallyEntry}>Add
            </button>
          </div>
          </li>          
        </ul>
      </div>
    )
  }

  render() {
    const tallies = [];
    const listNames = this.props.bw_pairs.get().map(name => name.bucket);
    let i=0;
    for (const name of listNames){
      tallies.push(this.createTally(name, i));
      i++;
    }
    let listBox = document.getElementById("tally_block");
    listBox.style.display = "block";
    return (
      <article>
        <div className="well listflex">{tallies}</div>
        <div>
          <button className="btn" onClick={this.reset}>Reset</button>
        </div>
      </article>
    )
  }
}

const domContainer = document.querySelector('#tally_block');
ReactDOM.render(<Tally bw_pairs={allBW_pairs}/>, domContainer);