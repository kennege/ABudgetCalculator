class Income {
  constructor(){
    this.income = 0;
    this.period = "";
    this.ping();
  }

  set(income, bw_pairs) {
    this.income = income;
    let income_found = false;
    let pair;

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
    this.bw_pairs = bw_pairs;
    return bw_pairs;
  }

  get = () => this.income;

  read = () => parseFloat($("#income").val());

  write() {
    $('#income').val(Math.round(this.get() / 26).toFixed(2));
    $('#setincome').text(`Your income is set to $${Math.round(this.get() / 26).toFixed(2)} ${this.period}`);
  }

  convert(factor) {
    let incomes = [   
      commas((factor * (this.income / 365)).toFixed(2)), // daily
      commas((factor * (this.income / 52)).toFixed(2)), // weekly
      commas((factor * (this.income / 26)).toFixed(2)), // fortnightly
      commas((factor * (this.income / 12)).toFixed(2)), // monthly
      commas(Math.round(factor * this.income)), // yearly
      commas(Math.round(factor * 2 * this.income)), // 2 yearly
      commas(Math.round(factor * 5 * this.income)), // 5 yearly
      commas(Math.round(factor * 10 * this.income)), // 10 yearly
      commas(Math.round(factor * 20 * this.income)), // 20 yearly
      commas(Math.round(factor * 30 * this.income)) // 30 yearly
  ];
    return incomes;
  }

  calculate(bw_pairs){
    let income;

    for (let i = 1; i <= 5; i++)
    {
      if(document.getElementById("o" + i).checked){
        this.period = " per " + document.getElementById("o" + i).name;
      }
    }
    income = this.read();
    switch(this.period) {
      case " per month":
        bw_pairs = this.set(income * 12, bw_pairs);
        break;
      case " per fortnight":
        bw_pairs = this.set(income * 26, bw_pairs);
        break;
      case " per week":
        bw_pairs = this.set(income * 52, bw_pairs);     
        break;
      case " per day":
        bw_pairs = this.set(income * 365, bw_pairs);
        break;
      default:
        break;
    } 
    return bw_pairs;
  }

  display() {
    $('#income_table').fadeIn(1000);
    // fill out income table
    let tab1;
    let tab2;
    let row1;
    let row2;

    tab1 = document.getElementById("income_t1");
    tab1.innerHTML = "";
    row1 = tab1.insertRow();
    for (let i=0;i<5;i++){
      insertTableEntry(row1, i, "$" + this.convert(1)[i]);  
    }
    row1 = tab1.insertRow();
    tab2 = document.getElementById("income_t2");
    tab2.innerHTML = "";
    row2 = tab2.insertRow();
    for (let i=0;i<5;i++){
      insertTableEntry(row2, i, "$" + this.convert(1)[i+5]);  
    }
    row2 = tab2.insertRow();   
  }

  ping = () => console.log("I am an Income!");
}