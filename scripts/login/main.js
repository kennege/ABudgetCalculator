console.log("main loaded!")
let user = new User();
let aCookie = new Cookie();

$(document).ready(function(){

  pre_fill();
  
  $('#l_login').click(function(event) {
    event.preventDefault();
    hide_popup();
    let name = $("#l_name").val();
    let password = $("#l_password").val();
    let remember = document.getElementById('l_remember').checked;
    $.ajax({
      type: "POST",
      url: "../php/login.php",
      data: {
        name: name,
        password: password,
      },
      cache: false,
      success: function(output) {
        welcomer(output, name, password, remember);
        console.log(output);
      },
      error: function(xhr, status, error) {
        console.error(xhr);
      }
    });
  }); 

  $('#signup').click(function(event) {
    event.preventDefault();
    hide_popup();
    let name = $("#s_name").val();
    let password_1 = $("#s_password1").val();
    let password_2 = $("#s_password2").val();
    let remember = document.getElementById('s_remember').checked;
    if (check_passwords(password_1, password_2)) {
      $.ajax({
        type: "POST",
        url: "../php/create_user.php",
        data: {
          name: name,
          password: password_1,
          confirm_password: password_2
        },
        cache: false,
        success: function(output) {
          welcomer(output, name, password_1, remember);
          console.log(output);
        },
        error: function(xhr, status, error) {
          console.error(xhr);
        }
      });
    }
  }); 

  $('#logoutbtn').click(function(event) {
    $('#logout').hide();
    $('#login').show();
    $.ajax({
      type: "POST",
      url: '../php/logout.php',
      data:{action:'call_this'},
      success:function(output) {
        console.log(output);
      }
    });    
    console.clear();
    location.reload();
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
    $('#logout').show();
    $('#login').hide();
    user.set_name(name);
    user.set_password(password);
    aCookie.set([{bucket:'__name__',weight:name}]);
    aCookie.set([{bucket:'__password__',weight:password}]);
    aCookie.set([{bucket:'__remember__',weight:remember}]);
    aCookie.check();
    if (output.includes("LOGIN")) {
      welcome_div.innerText = `Welcome back, ${user.name()}!`;
    } else {
      welcome_div.innerText = `Welcome, ${user.name()}!`;
    }
    // get income, bucket, history here
  } else {
    welcome_div.innerText = output;
  }
  outer_box.appendChild(welcome_div);
}

function check_passwords(p1, p2) {
  if (p1 !== p2){
    show_popup('passwords dont match, try again');
    return false;
  } else if (p1.length < 6) {
    show_popup('password must have at least 6 characters');
    return false;
  }
  return true;  
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
