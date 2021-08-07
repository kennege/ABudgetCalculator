<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);

require_once "config.php";
    
// get current income history
$sql = "SELECT b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, dates FROM track WHERE username='$name'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_assoc($result);  
for ($x = 0; $x < $n_buckets; $x++) {
    $b = "b".($x+1);
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
    $date_array = explode(",", $row["dates"]);
    array_push($date_array, date("Y/m/d"));
    $date_str = implode(",", $date_array);
    $sql = "UPDATE track SET dates='$date_str' WHERE username='$name'";
    if (!mysqli_query($link, $sql)) {  
        $error_message = "Error updating record: " . mysqli_error($link) . " at dates";
    }
}

if (empty($error_message)) {
    echo "UPDATE SUCCESS";
} else {
    echo $error_message;
}

?>