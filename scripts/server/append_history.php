<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = $_POST['n_buckets'];

require_once "config.php";

// check user details
$valid_user = false;
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$sql = "SELECT id, username, password FROM users WHERE username='$name'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_assoc($result);

if((mysqli_num_rows($result)>=1) && (password_verify($password, $row['password']))) { // user exists
    // Get HISTORY
    $history = array();  
    for ($x = 0; $x < $n_buckets; $x++) {
        $b = "b".($x+1);
        $sql = "SELECT $b FROM track WHERE username='$name'";
        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($result);  
        array_push($history, $row["$b"]);
    }
    //   $json_data = json_encode($history);
    if (count("history") > 0) { // previous history found
        //append history
    } 
    for ($x = 0; $x < $n_buckets; $x++) { // add new history
        $b = "b".($x+1);
        $bucket = $_POST["$b"];
        $sql = "UPDATE track SET $b='$bucket' WHERE username='$name'";
        if (!mysqli_query($link, $sql)) {  
            echo "Error updating record: " . mysqli_error($link) . " at bucket: " . $b;
            break;
        }    
    }
    echo $json_data;
} else {
  echo "user does not exist";
}
mysqli_close($link);

?>