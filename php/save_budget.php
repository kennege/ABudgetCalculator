<?php

$name = $_POST['name'];
$password = $_POST['password'];
$income = floatval($_POST['income']);
$n_buckets = intval($_POST['n_buckets']);

// Check if the user is already logged in
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
  echo "LOGGED IN";

  require_once "../php/config.php";

  // check user details
  $valid_user = false;
  $sql = "SELECT username, password FROM users WHERE username='$name' AND  password='$password'";
  $result = mysqli_query($link, $sql);

  if(mysqli_num_rows($result)>=1) { // user exists
    // Insert into BUCKETS
    $sql = "UPDATE buckets SET income='$income' WHERE username='$name";
    if (mysqli_query($conn, $sql)) {  
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . mysqli_error($conn);
    }
    // for ($x = 0; $x <= $n_buckets; $x++) {
    //   $sql = "UPDATE buckets SET b$x='$income' WHERE username='$name";
    //   if (mysqli_query($conn, $sql)) {  
    //     echo "Record updated successfully";
    //   } else {
    //     echo "Error updating record: " . mysqli_error($conn) . " at bucket: " . $x;
    //     break;
    //   }
    // }
    // Insert into TRACK
    $sql = "UPDATE track SET income='$income' WHERE username='$name";
    if (mysqli_query($conn, $sql)) {
      echo "Record updated successfully";
    } else {
      echo "Error updating record: " . mysqli_error($conn);
    }
  }

  // ask for saving vs spending if not done previously

  // ask for current totals if not done previously

  // display tracking data

}


?>