class Income {
  constructor(){
    this.income = 0;
    this.period = {
      name: "fortnight",
      value: 26,
    };
    this.ping();
  }

  set(income) {
    this.income = income * this.period.value;
    this.check();
  }

  reset(income){
    this.income = income;
  }

  get = () => this.income;

  set_period(period) {
    let value;
    console.log(period);
    switch(period) {
      case "month":
        this.income =  income * 12;
        value = 12;
        break;
      case "fortnight":
        this.income =  income * 26;
        value = 26;
        break;
      case "week":
        this.income =  income * 52;
        value = 52;
        break;
      case "day":
        this.income =  income * 365;
        value = 365;
        break;
      default:
        console.log("default")
        this.income =  income * 26;
        value = 26;
        return;
      } 
    this.period = {
      name : period,
      value : value
    };
  }

  reset_period(period) {
    this.period.name = period; 
    let options = ["year", "month", "fortnight", "week", "day"];
    for (let i = 0;i < 5; i++)
    {
      document.getElementById(options[i]).checked = false;
    }
    document.getElementById(this.period.name).checked = true;

    switch(period) {
      case "month":
        this.period.value = 12;
        break;
      case "fortnight":
        this.period.value = 26;
        break;
      case "week":
        this.period.value = 52;
        break;
      case "day":
        this.period.value = 365;
        break;
      default:
        return;
      }
    }

  get_period = () => this.period.name;

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

    $('#income').val(Math.round(this.income / this.period.value).toFixed(2));
    $('#setincome').text(`Your income is set to $${Math.round(this.income / this.period.value).toFixed(2)} per ${this.period.name}`);
  }

  check() {
    console.log("Checking income...")
    console.log("income: " + this.income);
    console.log("period name: " + this.period.name);
    console.log("period value: " + this.period.value);
  }

  ping = () => console.log("I am an Income!");
}