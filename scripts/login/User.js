class User {
  #name;
  #password;
  #income;
  #exists;
  #remember;
  constructor(){
    this.#name = "";
    this.#password = "";
    this.#income = {};
    this.#exists = false;
    this.#remember = true;
    this.ping();
  }

  name = () => this.#name;

  password = () => this.#password;

  income = () => this.#income;

  exists = () => this.#exists;

  set_name (name) {
    this.#name = name;
    this.#exists = true;
  }

  set_remember = (remember) => this.#remember = remember;

  set_password  = (password) => this.#password = password;

  save_all() {
    // add username, password to cookie
  }

  save_budget(income, period, bw_pairs) {
    let data = {
      name: this.#name,
      password: this.#password,
      income: income,
      period: period
    };
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      data.bw_pairs[i].bucket = bw_pairs[i].weight;
    }

    $.ajax({
      type: "POST",
      url: "../php/save_budget.php",
      data: data,
      cache: false,
      success: function(data) {
        user.set(name,password);
        welcomer();
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
    // console.log("income: " + this.#income);
  }

  ping = () => console.log("I am a User!");
}