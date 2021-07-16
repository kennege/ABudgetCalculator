class Table extends React.Component {
  constructor(props) {
     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
     this.myStyle = {
      margin: "2%",
      width: "90%",
    };
  }
  render() {
    return (
       <div>
      <button className="btn" onClick={this.generateTable}> Submit </button>
      </div>
    )

 }
 generateTable() {
   console.log(settings.get_init_dep());
   //  return this.state.students.map((student, index) => {
   //     const { id, name, age, email } = student //destructuring
   return (
                   <React.Fragment>

      <div id="table-container" style={{width:"100%"}}>
      <h1 id='title'>Interest per Year</h1>
      <table className='table-responsive table-condensed table-striped' id="table" >
         <tbody>
         <tr key={settings.get_num_years()}>
     <td>{settings.get_num_years()}</td>
     <td>{settings.get_num_years()}</td>
     <td>{settings.get_num_years()}</td>
     <td>{settings.get_num_years()}</td>
  </tr>
         </tbody>
      </table>
   </div>       </React.Fragment>
   )
   // })
 }

//  generateTable() {
//    console.log(settings.get_init_dep());
//    //  return this.state.students.map((student, index) => {
//    //     const { id, name, age, email } = student //destructuring
//    let div = document.getElementById("table-container");
//    let table = document.createElement("table");
//    let tableHead = document.createElement("thead");
//    tableHead.innerHTML = 
//    `<tr>
//     <th class='text-center' id="bucketcol">Bucket</th>
//     <th class='text-center' id="daycol">Daily</th>
//     <th class='text-center' id="weekcol">Weekly</th>
//     <th class='text-center' id="fortnightcol">Fortnightly</th>
//     <th class='text-center' id="monthcol">Monthly</th>
//     <th class='text-center' id="yearcol">Yearly</th>
//     </tr>`
//    let tableBody = document.createElement("tbody");
//    tableBody.innerHTML =  `<tr>
//    <th class='text-center' id="bucketcol">Bucket</th>
//    <th class='text-center' id="daycol">Daily</th>
//    <th class='text-center' id="weekcol">Weekly</th>
//    <th class='text-center' id="fortnightcol">Fortnightly</th>
//    <th class='text-center' id="monthcol">Monthly</th>
//    <th class='text-center' id="yearcol">Yearly</th>
// </tr>`
//    table.appendChild(tableHead);
//    table.appendChild(tableBody);
//    div.appendChild(table);
    

//  }
}

// document.getElementById("#$submit").onclick(console.log("HELLO"));

const domContainer = document.querySelector('#button-div');
ReactDOM.render(<Table data={settings}/>, domContainer);