<?php

$password = trim($_POST["password"]);
$confirm_password = trim($_POST["confirm_password"]);
$name = trim($_POST["name"]);
$username_err = $password_err = $table_err = "";

require_once "config.php";

// Validate user
if(empty(trim($_POST["name"]))){
    $username_err = "Please enter a username.";
} elseif (!preg_match('/^[a-zA-Z0-9_]+$/', trim($_POST["name"]))) {
    $username_err = "Username can only contain letters, numbers, and underscores.";
} else {
    $sql = "SELECT id FROM users WHERE username='$name'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    if (mysqli_stmt_num_rows($result) == 1) {
        $username_err = "This username is already taken.";
    }
}

// Validate password
if (empty($password)) {
    $password_err = "Please enter a password.";     
} elseif (strlen(trim($password)) < 6) {
    $password_err = "Password must have at least 6 characters.";
} else if (empty($confirm_password)) {
    $password_err = "Please confirm password.";     
} else if ($password != $confirm_password) {
    $password_err = "Password did not match.";        
}

// Check input errors before inserting in database
if(empty($username_err) && empty($password_err)){

    // Insert into USERS
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);           
    $sql = "INSERT INTO users (username, password) VALUES ('$name', '$hashed_password')";
    if (!mysqli_query($link, $sql)) {  
        $table_err = "user table error: " . mysqli_error($link);
    } else {
        echo "User added.\n";
    }

    // Get ID
    $sql = "SELECT id FROM users WHERE username='$name'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);
    $id = $row['id'];

    // Insert into BUDGET
    $sql = "INSERT INTO budget (id, username) VALUES ('$id', '$name')";
    if (!mysqli_query($link, $sql)) {  
        $table_err = "budget table error: " . mysqli_error($link);
    } else {
        echo "User added to budget.\n";
    }

    // Insert into TRACK
    $sql = "INSERT INTO track (id, username) VALUES ('$id', '$name')";
    if (!mysqli_query($link, $sql)) {  
        $table_err = "track table error: " . mysqli_error($link);
    } else {
        echo "User added to tracking.\n";
    }

    // Insert into SPENDING_SAVING
    $sql = "INSERT INTO spending_saving (id, username) VALUES ('$id', '$name')";
    if (!mysqli_query($link, $sql)) {  
        $table_err = "spending_saving table error: " . mysqli_error($link);
    } else {
        echo "User added to spending_saving.\n";
    }
} else {
    echo $username_err . $password_err;
}

if (empty($table_err)) {
    echo "SIGNUP SUCCESS";
} else {
    echo $table_err;
}

mysqli_close($link);

?>