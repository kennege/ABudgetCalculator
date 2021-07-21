console.log("main loaded!")
let user = new User();
let aCookie = new Cookie();

$(document).ready(function(){

  pre_fill();
  
  $('#login').click(function(event) {
    event.preventDefault();
    hide_popup();
    let name = $("#l_name").val();
    let password = $("#l_password").val();
    let remember = document.getElementById('l_remember').checked;
    $.ajax({
      type: "POST",
      url: "../php/load_details.php",
      data: {
        name: name,
        password: password,
      },
      cache: false,
      success: function(data) {
        user.set_name(name);
        user.set_password(password);
        aCookie.set([{bucket:'__name__',weight:name}]);
        aCookie.set([{bucket:'__password__',weight:password}]);
        aCookie.set([{bucket:'__remember__',weight:remember}]);
        aCookie.check();
        welcomer();
        console.log(data);
      },
      error: function(xhr, status, error) {
        console.error(xhr);
      }
    });
  }); 

  $('#signup').click(function(event) {
    event.preventDefault();
    hide_popup();
    let email = $("#s_email").val();
    let name = $("#s_name").val();
    let password_1 = $("#s_password1").val();
    let password_2 = $("#s_password2").val();
    let remember = document.getElementById('s_remember').checked;

    if (check_passwords(password_1, password_2) && validate_email(email)){

      $.ajax({
        type: "POST",
        url: "../php/create_user.php",
        data: {
          email: email,
          name: name,
          password: password_1,
        },
        cache: false,
        success: function(data) {
          user.set_name(name);
          user.set_password(password_1);
          aCookie.set([{bucket:'__name__',weight:name}]);
          aCookie.set([{bucket:'__password__',weight:password_1}]);
          aCookie.set([{bucket:'__remember__',weight:remember}]);
          aCookie.check();
          welcomer();

          console.log(data);
        },
        error: function(xhr, status, error) {
          console.error(xhr);
        }
      });
    }
  }); 

  $('#reset').click(function(event) {
    hide_popup();
    $("#track-box").hide();
    aCookie.delete();
    aCookie.check();
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
    $('#name').val(name);
    $('#password').val(password);
  }
  
}

function welcomer() {
  let outer_box = document.getElementById("track-box");
  outer_box.style.display = "block";
  outer_box.innerHTML = "";
  let welcome_div = document.createElement("p");
  welcome_div.innerText = `Welcome back, ${user.name()}!`;
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

function validate_email(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase()))
  {
    return true;
  } else {
    show_popup('please enter a valid email');
  }
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