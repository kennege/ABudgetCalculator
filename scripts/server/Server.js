class Server {
  #history_found;
  constructor(){
    this.#history_found = false;
    this.ping();
  }
  
  signup_file = "../scripts/server/sign_up.php";
  login_file = "../scripts/server/login.php";
  
  get_budget_file = "../scripts/server/load_budget.php"; 
  set_budget_file = "../scripts/server/save_budget.php";
  
  get_spending_saving_file = "../scripts/server/get_spending_saving.php";
  set_spending_saving_file = "../scripts/server/set_spending_saving.php";

  get_history_file = "../scripts/server/load_history.php";
  set_history_file = "../scripts/server/append_history.php";
  
  get_user = () => sessionStorage.getItem('name');
  get_password = () => sessionStorage.getItem('password');

  found_history = (bool) => this.#history_found = bool;
  contains_history = () => this.#history_found;


  signup_data(name, password1, password2) {
    return {
      name : name,
      password: password1,
      confirm_password: password2
    };
  }

  login_data (name, password) {
    return {
      name: name,
      password: password,
    };
  }

  log_out() {
    $("#load_button_div").hide();
    sessionStorage.clear();
    this.show_login();
    console.log("SERVER: Log out SUCCESS.\n"); 
    return "logged out";
  }

  delete_user() {
    
  }

  get_budget_data = {name: this.get_user(), password: this.get_password()};
  set_budget_data(income, period, bw_pairs) {
    let data = this.get_bw_pair_data(bw_pairs);
    data["period"] = period;
    data["income"] = income;
    return data;
  }

  get_spending_saving_data = (ss_pairs) => this.get_bw_pair_data(ss_pairs);
  set_spending_saving_data = (ss_pairs) => this.get_bw_pair_data(ss_pairs);

  get_history_data(bw_pairs){
    return { 
      name: this.get_user(), 
      password: this.get_password(),
      n_buckets: bw_pairs.length,
    };
  }
  set_history_data = (bw_pairs) => this.get_bw_pair_data(bw_pairs);

  reset_history() {

  }

  get_bw_pair_data(bw_pairs) {
    let n_buckets = bw_pairs.length;
    let data = {
      name: this.get_user(),
      password: this.get_password(),
      n_buckets: n_buckets,
    };
    for (let i=0;i<n_buckets;i++){
      let bucket = bw_pairs[i].bucket;
      let weight = bw_pairs[i].weight;
      let bucket_name = `b${(i+1)}`;
      data[`${bucket_name}`] = `${bucket}:${weight}`;
    }
    return data;
  }

  async send(data, file, cb) {
    let response = "";
    $.ajax({
      async: true,
      type: "POST",
      url: file,
      data: data,
      cache: false,
      success: function(server_response) {
        cb(server_response);
      }
    });
    return response;
  }

  show_login() {
    $('#logout').hide();
    $('#login').show();
  }

  show_logout() {
    $('#logout').show();
    $('#login').hide();
  }

  is_logged_in() {
    let status = sessionStorage.getItem('logged_in'); 
    if (status !== null) { 
      if (status.includes("true")) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  save_session(name, password) {
    sessionStorage.setItem('logged_in', true);
    sessionStorage.setItem('name',name);
    sessionStorage.setItem('password',password);
    this.show_logout();
  }

  check() {
    console.log("Checking Server...")
  }

  ping = () => console.log("I am a Server!");
}