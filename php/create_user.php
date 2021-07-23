<?php
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];
$name = $_POST['name'];

require_once "../php/config.php";

$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate user
    $param_username = trim($_POST["name"]);
    if(empty(trim($_POST["name"]))){
        $username_err = "Please enter a username.";
    } elseif(!preg_match('/^[a-zA-Z0-9_]+$/', trim($_POST["name"]))){
        $username_err = "Username can only contain letters, numbers, and underscores.";
    } else{
        $sql = "SELECT id FROM users WHERE username = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                    $username_err = "This username is already taken.";
                } else{
                    $username = trim($_POST["name"]);
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }
        else {
            echo "Table doesn't exist";
        }
    }
    // Validate password
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter a password.";     
    } elseif(strlen(trim($_POST["password"])) < 6){
        $password_err = "Password must have atleast 6 characters.";
    } else{
        $password = trim($_POST["password"]);
    }
    // Validate confirm password
    if(empty(trim($_POST["confirm_password"]))){
        $confirm_password_err = "Please confirm password.";     
    } else{
        $confirm_password = trim($_POST["confirm_password"]);
        if(empty($password_err) && ($password != $confirm_password)){
            $confirm_password_err = "Password did not match.";
        }
    }
    // Check input errors before inserting in database
    if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){

        // Insert into USERS
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_password);   
            $param_password = password_hash($password, PASSWORD_DEFAULT);           
            if(mysqli_stmt_execute($stmt)){
                echo "SIGNUP SUCCESS";
                echo $username . "added to USERS";
                // header("location: ../php/login.php");
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }

        // Get ID
        $found_user = false;
        $sql = "SELECT id FROM users WHERE username='$param_username'";
        $id = mysqli_query($link, $sql);

        // Insert into BUCKETS
        $sql = "INSERT INTO buckets (id, username) VALUES (? ?)";
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "ss", $id, $param_username);
            if(mysqli_stmt_execute($stmt)){
                echo $username . "added to BUCKETS";
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }

        // Insert into TRACK
        $sql = "INSERT INTO track (id, username) VALUES (?, ?)";
        if($stmt = mysqli_prepare($link, $sql)){
            mysqli_stmt_bind_param($stmt, "ss",$id, $param_username);
            if(mysqli_stmt_execute($stmt)){
                echo $username . "added to TRACK";
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }

    } else {
      echo $username_err;
      echo $password_err;
      echo $confirm_password_err;
    }   
    mysqli_close($link);
}
?>