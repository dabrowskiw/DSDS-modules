<?php
error_reporting(0);
require_once "./php/auth.php";

auth_logout();
header('Location: /', true, 302);
?>