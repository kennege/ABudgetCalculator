function set_income(income) {
  let income_found = false;
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (bw_pairs[i].bucket.includes("income")) {
      bw_pairs[i].weight = income;
      income_found = true;
    }
  }
  if (!income_found){
    pair = {
      bucket : 'income',
      weight : income
    };
    bw_pairs.push(pair);
  }
}

function get_income() {
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (bw_pairs[i].bucket.includes("income")) {
      return bw_pairs[i].weight;
    }
  }
}

function calculateIncome(e){ // change to event listener
  if ((e.keyCode == 13) || (e.keyCode == null)) {
    for (let i = 1;i <= 5; i++)
    {
      if(document.getElementById("o" + i).checked){
        period = " per " + document.getElementById("o" + i).name;
      }
    }
    let income = parseFloat(document.getElementById("income").value);
    document.getElementById("setincome").innerText = "Your income is set to: $" + commas(income.toFixed(2)) + period;
    switch(period) {
      case " per month":
        set_income(income * 12);
        break;
      case " per fortnight":
        set_income(income * 26);
        break;
      case " per week":
        set_income(income * 52);     
        break;
      case " per day":
        set_income(income * 365);
    } 
    // fill out income table
    deleteCookie();
    setCookie();
    populateIncomeTable();
    document.getElementById("income_table").style.display = "block"; // display income table
    document.getElementById("tree_box").style.display = "block"; // display bucket tree
    return false;
  }
}

function set_income(income) {
  let income_found = false;
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if (bw_pairs[i].bucket.includes("income")) {
      bw_pairs[i].weight = income;
      income_found = true;
    }
  }
  if (!income_found){
    pair = {
      bucket : 'income',
      weight : income
    };
    bw_pairs.push(pair);
  }
}

function populateIncomeTable() {
  // fill out income table
  let tab1 = document.getElementById("income_t1");
  tab1.innerHTML = "";
  let row1 = tab1.insertRow();
  for (let i=0;i<5;i++){
    insertTableEntry(row1, i, "$" + convertIncome(get_income(),1)[i]);  
  }
  row1 = tab1.insertRow();
  let tab2 = document.getElementById("income_t2");
  tab2.innerHTML = "";
  let row2 = tab2.insertRow();
  for (let i=0;i<5;i++){
    insertTableEntry(row2, i, "$" + convertIncome(get_income(),1)[i+5]);  
  }
  row2 = tab2.insertRow();   
}

function convertIncome(income, factor) {
  let incomes = [   
    commas((factor * (income / 365)).toFixed(2)), // daily
    commas((factor * (income / 52)).toFixed(2)), // weekly
    commas((factor * (income / 26)).toFixed(2)), // fortnightly
    commas((factor * (income / 12)).toFixed(2)), // monthly
    commas(Math.round(factor * income)), // yearly
    commas(Math.round(factor * 2 * income)), // 2 yearly
    commas(Math.round(factor * 5 * income)), // 5 yearly
    commas(Math.round(factor * 10 * income)), // 10 yearly
    commas(Math.round(factor * 20 * income)), // 20 yearly
    commas(Math.round(factor * 30 * income)) // 30 yearly
];
  return incomes;
}
  
