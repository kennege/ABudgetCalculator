console.log("main loaded!")
let user = new User();
let aCookie = new Cookie();
let server = new Server();

$(document).ready(function(){

  pre_fill();

  if (server.is_logged_in()){
    server.show_logout();
  }

  $('#signup').click(function(event) {
    event.preventDefault();
    hide_popup();
    let name = $("#s_name").val();
    let password_1 = $("#s_password1").val();
    let password_2 = $("#s_password2").val();
    server.send(server.signup_data(name, password_1, password_2), server.signup_file, signup_cb);
  }); 

  function signup_cb(server_response) {
    if (server_response.includes('SUCCESS')){
      this.save_session(name, password_1);
      console.log("SERVER: Sign up SUCCESS.\n");
      let name = $("#s_name").val();
      let password_1 = $("#s_password1").val();
      let remember = document.getElementById('s_remember').checked;
      welcomer(server_response, name, password_1, remember);
      server.save_session(name, password_1);
      server.show_logout();
    }   
  }

  $('#l_login').click(function(event) {
    event.preventDefault();
    hide_popup();
    let name = $("#l_name").val();
    let password = $("#l_password").val();
    server.send(server.login_data(name, password), server.login_file, login_cb);
  }); 

  function login_cb(server_response) {
    let name = $("#l_name").val();
    let password = $("#l_password").val();
    let remember = document.getElementById('l_remember').checked;
    console.log("SERVER: Login SUCCESS.\n");
    welcomer(server_response, name, password, remember);
    server.save_session(name, password);
    server.show_logout();
  }

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    hide_popup();
    server.log_out();
  });

});

function pre_fill() {
  let cEntries = aCookie.get();
  let remember = false;
  let name;
  let password;
  for (let i=0; i<cEntries.length; i++){
    cPair = cEntries[i].split("=");
    if (cPair[0].includes('__remember__') && cPair[1]){
      remember = true;
    }
  }
  if (remember) {
    for (let i=0; i<cEntries.length; i++){
      cPair = cEntries[i].split("=");
      if (cPair[0].includes('__name__')){
        name = cPair[1];
      }
      if (cPair[0].includes('__password__')){
        password = cPair[1];
      }
    }
    $('#l_name').val(name);
    $('#l_password').val(password);
  }
}

function welcomer(output, name, password, remember) {
  let outer_box = document.getElementById("track-box");
  outer_box.style.display = "block";
  outer_box.innerHTML = "";
  let welcome_div = document.createElement("p");
  if (output.includes("SUCCESS")){
    user.set_name(name);
    user.set_password(password);
    if (output.includes("LOGIN")) {
      welcome_div.innerText = `Welcome back, ${user.name()}!`;
    } else {
      welcome_div.innerText = `Welcome, ${user.name()}!`;
    }
  } else {
    welcome_div.innerText = output;
  }
  outer_box.appendChild(welcome_div);
}

function hide_popup() {
  $("#popup").remove();
}

function show_popup(text) {
  hide_popup();
  let form = document.getElementById('s_div');
  let p = document.createElement('p');
  p.id = 'popup';
  p.innerText = text;
  form.appendChild(p);
}
