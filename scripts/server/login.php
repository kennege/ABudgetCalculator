<?php
// Initialize the session
session_start();
 
require_once "config.php";

$name = $password = "";
$name_err = $password_err = $login_err = "";
 
if($_SERVER["REQUEST_METHOD"] == "POST"){

    if(empty(trim($_POST["name"]))){
        $name_err = "Please enter username.";
    } else{
        $name = trim($_POST["name"]);
    }
    
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }
  
    if(empty($name_err) && empty($password_err)){
        $sql = "SELECT id, username, password FROM users WHERE username = ?";
      
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_name);
            $param_name = $name;
          
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                  if(mysqli_stmt_num_rows($stmt) == 1){                    
                    mysqli_stmt_bind_result($stmt, $id, $name, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                      if(password_verify($password, $hashed_password)){
                            session_start();                        
                            
                            echo "LOGIN SUCCESS";
                        } else{
                            $login_err = "Invalid username or password.";
                            echo $login_err;
                          }
                    }
                } else{
                    $login_err = "Invalid username or password.";
                    echo $login_err;
                  }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }
    } else {
      echo $name_err;
      echo $password_err;
      echo $login_err;
    }
    // Close connection
    mysqli_close($link);
}
?>