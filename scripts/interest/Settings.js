class Settings {
  #init_dep;
  #reg_dep;
  #dep_freq;
  #num_years;
  #dep_per_year;
  #rate;

  #totals;
  #deposits;
  #interests;
  constructor(){
  this.reset();
  this.ping();
  }

  get_init_dep = () => this.#init_dep;

  set_init_dep(init_dep){
    if (!isNaN(parseFloat(init_dep))){
      this.#init_dep = parseFloat(init_dep);
    }
  }

  get_reg_dep = () => this.#reg_dep;
  
  set_reg_dep(reg_dep){
    if (!isNaN(parseFloat(reg_dep))){
      this.#reg_dep = parseFloat(reg_dep);
    }
  }

  get_dep_freq = () => this.#dep_freq;
  
  set_dep_freq(dep_freq){
      this.#dep_freq = dep_freq;
  }
  
  get_num_years = () => this.#num_years;
  
  set_num_years(num_years){
    if (!isNaN(parseInt(num_years))){
      this.#num_years = parseInt(num_years);
    }
  }

  get_rate = () => this.#rate;

  set_rate(rate){
    if (!isNaN(parseFloat(rate))){
      this.#rate = 0.01 * parseFloat(rate);
    }
  }

  freq2years(){
    let ratios = {
      'Yearly' : 1,
      'Monthly' : 12,
      'Fortnightly' : 26,
      'Weekly' : 52,
      'Daily' : 365
    };
    for (var key in ratios){
      if (this.#dep_freq.includes(key)) {
        this.#dep_per_year = ratios[key];
        return this.#dep_per_year;
      }
    }
  }
 
  get_totals = () => this.#totals;

  save_totals(){
    let P_now = this.#init_dep; // principal (init_dep)
    let P_prev = P_now;
    let r = this.#rate; // interest rate (rate)
    let n = this.#num_years; // number of years (num_years)
    let dep_per_year = this.freq2years(); // deposits/year
    let dep = this.#reg_dep; // amount deposited
    let A = 0;
    let running_total = [];
  
    for (let i=0; i<n; i++){
      A = P_now * (1 + r);
      P_prev = P_now;
      P_now += A - P_prev + (dep * dep_per_year); 
      running_total.push(P_now.toFixed(2));
    }
    this.#totals = running_total;
  }

  get_deposits = () => this.#deposits;
 
  save_deposits() {
    let P = 0;
    let n = this.#num_years; // number of years (num_years)
    let dep_per_year = this.freq2years(); // deposits/year
    let dep = this.#reg_dep; // amount deposited
    let running_total = [];
  
    for (let i=0; i<n; i++){
      P += dep * dep_per_year;
      running_total.push(P);
    }
    this.#deposits = running_total;
  }
 
  get_interests = () => this.#interests;
 
  save_interests(){
    let P0 = this.#init_dep; // principal (init_dep)
    let n = this.#num_years; // number of years (num_years) 
    let running_total = []; 
    
    for (let i=0; i<n; i++){
      running_total.push(this.#totals[i] - this.#deposits[i] - P0);
    }
    this.#interests = running_total;
  }

  save() {
    this.set_init_dep($('#init_dep').val());
    this.set_reg_dep($('#reg_dep').val());
    this.set_num_years($('#num_years').val());
    this.set_rate($('#rate').val());
    this.save_deposits();
    this.save_totals();
    this.save_interests();
  }

  reset() {
    this.#init_dep = 10000;
    this.#reg_dep = 1000;
    this.#dep_freq = 'Monthly';
    this.#num_years = 10;
    this.#rate = 5;
    this.#dep_per_year = 0;
    this.#totals = [];
    this.#deposits = [];
    this.#interests = [];
  }

  check() {
    console.log("Checking settings...");
    console.log(this.#init_dep);
    console.log(this.#reg_dep);
    console.log(this.#dep_freq);
    console.log(this.#num_years);
    console.log(this.#rate);
    console.log(this.#dep_per_year);
    console.log(this.#totals);
    console.log(this.#deposits);
    console.log(this.#interests);
  }

  ping = () => console.log("I am Settings!");
}