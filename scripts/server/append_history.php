<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);

require_once "config.php";

// check user details
$error_message = "";
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$sql = "SELECT id, username, password FROM users WHERE username='$name'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_assoc($result);

if((mysqli_num_rows($result)>=1) && (password_verify($password, $row['password']))) { // user exists
    
    // get current income history
    for ($x = 0; $x < $n_buckets; $x++) {
        $b = "b".($x+1);
        $sql = "SELECT $b FROM track WHERE username='$name'";
        $result = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($result);  
        $bw_pair = explode(":", $row["$b"]);
        $bucket = $bw_pair[0];
        $weights = $bw_pair[1];
        $weight_array = explode(",",$weights);
        
        // try to match new entry with history
        $bucket_match = false;
        for ($y=0; $y<$n_buckets; $y++) {
            $b_new = "b".($y+1);
            $new_bw_pair = explode(":",$_POST["$b_new"]);
            $new_bucket = $new_bw_pair[0];
            $new_weight = $new_bw_pair[1];            
            if ($bucket == $new_bucket) {
                if ($new_weight == "NaN") {
                    $error_message = "empty entry detected"; 
                } else {
                    array_push($weight_array, $new_weight);
                } 
                $bucket_match = true;
            }
        }

        // if match, append history
        if ($bucket_match) {
            $weights = implode(",", $weight_array);
            $bw_pair = "{$bucket}:{$weights}";
            $sql = "UPDATE track SET $b='$bw_pair' WHERE username='$name'";
            if (!mysqli_query($link, $sql)) {  
                $error_message = "Error updating record: " . mysqli_error($link) . " at bucket: " . $b;
                break;
            } 
        } else {
            $error_message = "new category detected"; // overwrite or add?
        }
    }

    // update date
    if (empty($error_message)) {
        $sql = "SELECT dates FROM track WHERE username='$name'";
        $date_result = mysqli_query($link, $sql);
        $dates_row = mysqli_fetch_assoc($date_result);  
        $date_array = explode(",", $dates_row["dates"]);
        array_push($date_array, date("Y/m/d"));
        $date_str = implode(",", $date_array);
        $sql = "UPDATE track SET dates='$date_str' WHERE username='$name'";
        if (!mysqli_query($link, $sql)) {  
            $error_message = "Error updating record: " . mysqli_error($link) . " at dates";
        }
    }

} else {
    $error_message = "user does not exist";
}

if (empty($error_message)) {
    echo "UPDATE SUCCESS";
} else {
    echo $error_message;
}

mysqli_close($link);

?>