<?php
    $uidCookie = $_COOKIE["uid"];
    $sessionCookie = $_COOKIE["session"];
    $verifySession = $sessionCookie / $uidCookie;
    $currentServerTime = time();
    $currentDate = date('d-m-Y H:i:s', $currentServerTime);
    $cookieDate = date("d-m-Y H:i:s", $verifySession);

    If($verifySession >= $currentServerTime && $verifySession <= $currentServerTime+1800){
        echo "Cookie für die uid $uidCookie ist valid";
    } else {
        echo "Cookie ist ungültig";
    }
echo "<br> Der Inhalt des UID Cookies: $uidCookie";
echo "<br> Der Inhalt des SessionsCookies: $sessionCookie";
echo "<br> Cookie als Datum: $cookieDate";
echo "<br> Zeit des Cookies: $verifySession";
echo "<br> Serverzeit als Datum: $currentDate";
echo "<br> Serverzeit: $currentServerTime";

?>
<br>Click here to clean <a href = "../logout.php" tite = "Logout">Session.
