<?php
// Initialize the session
session_start();
 
session_destroy();
 
echo "logged out";
exit;
?>