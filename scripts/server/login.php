<?php
 
require_once "config.php";

$name = $password = "";
$name_err = $password_err = "";

if(empty(trim($_POST["name"]))){
    $name_err = "FAIL: Please enter username.";
} else {
    $name = trim($_POST["name"]);
}    
if(empty(trim($_POST["password"]))){
    $password_err = "Please enter your password.";
} else {
    $password = trim($_POST["password"]);
}

if(empty($name_err) && empty($password_err)){
    $sql = "SELECT id, username, password FROM users WHERE username='$name'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    $hashed_password = $row['password'];              
    $id = $row['id'];
    if ((mysqli_num_rows($result) > 0) && (password_verify($password, $hashed_password))) {     
        echo "LOGIN SUCCESS";
    } else {
        echo "FAIL: Invalid username or password.";
    }
} else {
    echo $name_err . $password_err;            
} 

mysqli_close($link);

?>