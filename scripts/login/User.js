class User {
  #name;
  #password;
  #income;
  #period;
  #exists;
  #remember;
  #bw_pairs;
  constructor(){
    this.#name = "";
    this.#password = "";
    this.#income = {};
    this.#exists = false;
    this.#remember = true;
    this.#bw_pairs = [];
    this.ping();
  }

  name = () => this.#name;
  password = () => this.#password;
  income = () => this.#income;
  bw_pairs = () => this.#bw_pairs;
  exists = () => this.#exists;

  set_name (name) {
    this.#name = name;
    this.#exists = true;
  }

  set_remember = (remember) => this.#remember = remember;
  set_password  = (password) => this.#password = password;

  save_budget(income, bw_pairs) {
    this.#income = income;
    this.#bw_pairs = bw_pairs;
    console.log("s: " + this.#remember);
    let data = {
      name: this.#name,
      password: this.#password,
      income: income,
    };
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
     let bucket = bw_pairs[i].bucket;
     let weight = bw_pairs[i].weight;
     data[`${bucket}`] = weight;
    }
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
    }
    $.ajax({
      type: "POST",
      url: "../php/save_budget.php",
      data: data,
      cache: false,
      success: function(data) {
        console.log(data);
      },
      error: function(xhr, status, error) {
        console.error(xhr);
      }
    });
  }

  check() {
    console.log("Checking user...")
    console.log("name: " + this.#name);
    console.log("password: " + this.#password);
  }

  ping = () => console.log("I am a User!");
}