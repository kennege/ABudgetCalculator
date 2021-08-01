class Server {
  #directory;
  #history_found;
  constructor(){
    this.#directory = "../scripts/server/";
    this.#history_found = false;
    this.ping();
  }

  get_user = () => sessionStorage.getItem('name');
  get_password = () => sessionStorage.getItem('password');

  found_history = (bool) => this.#history_found = bool;
  contains_history = () => this.#history_found;

  sign_up(name, password_1, password_2) {
    let data = {
      name: name,
      password: password_1,
      confirm_password: password_2
    };      
    let response = this.send_data(data, `${this.#directory}sign_up.php`);
    console.log(response);
    if (response.includes('SUCCESS')){
      this.save_session(name, password_1);
      console.log("SERVER: Sign up SUCCESS.\n");

    }    
    return response;
  }

  log_in(name, password) {
    let data = {
      name: name,
      password: password,
    };
    let response = this.send_data(data, `${this.#directory}login.php`);
    if (response.includes('SUCCESS')){
      this.save_session(name, password);
      console.log("SERVER: Log in SUCCESS.\n");
    }
    return response;
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

  save_budget(income, bw_pairs) {
    let data = this.get_bw_pair_data(bw_pairs);
    data["income"] = income;
    let server_response = this.send_data(data, `${this.#directory}save_budget.php`);
    console.log("SERVER: Saving BUDGET: " + server_response + ".\n");  
    return server_response;
  }

  load_budget() {
    let data = {
      name: this.get_user(),
      password: this.get_password()
    };
    let server_response = this.send_data(data, `${this.#directory}load_budget.php`);
    let budget = JSON.parse(server_response);
    let n_buckets = budget.length;
    let bw_pairs = [];
    let income = 0;
    for (let i=0; i<n_buckets; i++){
      let current_pair = budget[i].split(":");
      if (current_pair[0].includes("income")) {
        income = parseFloat(current_pair[1]);
      } else {
        let pair = {
          bucket: current_pair[0],
          weight: parseFloat(current_pair[1]),
        };     
        bw_pairs.push(pair);
      }
    }
    console.log("SERVER: Received " + n_buckets + " pairs from BUDGET.\n");
    return [income, bw_pairs];
  }

  append_history(bw_pairs) {
    let data = this.get_bw_pair_data(bw_pairs);
    let server_response = this.send_data(data, `${this.#directory}append_history.php`);
    console.log("SERVER: Appending TRACKING history: " + server_response + ".\n");
    return server_response;
  }
  
  load_history(n_buckets) {
    let data = {
      name: this.get_user(),
      password: this.get_password(),
      n_buckets: n_buckets,
    };
    let server_response = this.send_data(data, `${this.#directory}load_history.php`);
    if (!server_response.includes("FAIL")) {
      let history = JSON.parse(server_response);
      let history_pairs = [];
      let date_pair = [];
      for (let i=0; i<history.length; i++){
        if (history[i].includes(":")) { 
          let current_pair = history[i].split(":");
          let bucket = current_pair[0];
          let history_strs = current_pair[1].split(",");
          let history_array = [];
          for (let j=0; j<history_strs.length; j++) {
            if (history_strs[j]) {
              history_array.push(parseFloat(history_strs[j]));
            }
          }
          let pair = {
            bucket: bucket,
            weight: history_array,
          };     
          history_pairs.push(pair);
        } else {
          let dates_strs = history[i].split(",");
          let dates_array = [];        
          for (let j=0; j<dates_strs.length; j++) {
            if (dates_strs[j]) {
              dates_array.push(dates_strs[j]);
            }
          }
          date_pair = [{
            bucket: "dates",
            weight: dates_array
          }];
        }
      }
      console.log("SERVER: Received " + history.length + " history pairs from TRACKING.\n");
    } else {
      console.log("SERVER: No history detected in TRACKING.\n");
    }
    return [history_pairs, date_pair];
  }

  reset_history() {

  }

  set_spending_saving(bw_pairs) {
    let data = this.get_bw_pair_data(bw_pairs);
    console.log(data);
    let server_response = this.send_data(data, `${this.#directory}set_spending_saving.php`);
    console.log("SERVER: Setting SPENDING_SAVING: " + server_response + ".\n");
    return server_response;
  }

  get_spending_saving(bw_pairs) {
    let data = this.get_bw_pair_data(bw_pairs);
    let server_response = this.send_data(data, `${this.#directory}get_spending_saving.php`);
    let spending_saving = JSON.parse(server_response);
    let n_buckets = spending_saving.length;
    let ss_pairs = [];
    for (let i=0; i<n_buckets; i++){
      let current_pair = spending_saving[i].split(":");
      let pair = {
        bucket: current_pair[0],
        weight: current_pair[1],
      };     
      ss_pairs.push(pair);
    }
    console.log("SERVER: Received " + n_buckets + " pairs from SPENDING_SAVING.\n");
    return ss_pairs;
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

  send_data(data, file) {
    let response = "";
    $.ajax({
      async: false,
      type: "POST",
      url: file,
      data: data,
      cache: false,
      success: function(server_response) {
        response = server_response;
      },
      error: function(server_response, status, error) {
        response = server_response;
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