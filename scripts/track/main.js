console.log("main loaded!")
let user = new User();

$(document).ready(function(){
  
  $('#submit').click(function(event) {
    event.preventDefault();
    let name = $("#name").val();
    let password = $("#password").val();
  
    $.ajax({
      type: "POST",
      url: "../php/save_details.php",
      data: {
        name: name,
        password: password,
      },
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
  }); 

  $('#reset').click(function(event) {
    $("#track-box").hide();
    console.clear();
    location.reload();
  });

});

function welcomer() {
  let outer_box = document.getElementById("track-box");
  outer_box.style.display = "block";
  let welcome_div = document.createElement("p");
  welcome_div.innerText = `Welcome back, ${user.name()}!`;
  outer_box.appendChild(welcome_div);
}