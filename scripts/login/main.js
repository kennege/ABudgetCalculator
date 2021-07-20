console.log("main loaded!")
let user = new User();
let aCookie = new Cookie();

$(document).ready(function(){

  pre_fill();
  
  $('#submit').click(function(event) {
    event.preventDefault();
    let name = $("#name").val();
    let password = $("#password").val();
    let remember = document.getElementById('remember').checked;
  
    $.ajax({
      type: "POST",
      url: "../php/save_details.php",
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

  $('#reset').click(function(event) {
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