let aCookie = new Cookie();
let server = new Server();

$(document).ready(function(){
    
    if (server.is_logged_in()){
      server.show_logout();
    }
    
    $('#logoutbtn').click(function(event) {
      event.preventDefault();
      server.log_out();
    });
    
  });