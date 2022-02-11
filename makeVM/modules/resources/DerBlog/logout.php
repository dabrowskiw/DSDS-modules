<?php
setcookie("Alfredo", "", time() - 3600);
setcookie("sessions", 0, time() - 3600, "/");
setcookie("uid", 0, time() -3600, "/");
setcookie("HackenInVMs", 0, time() - 3600, "/");

session_start();
unset($_SESSION["username"]);
unset($_SESSION["password"]);

echo 'You have cleaned session';
//header('Refresh: 2; URL = index.php');
header("Location: index.php");
?>