<?php
setcookie(
    "TestSetCookieFail",
    "Haha",
    0,
    "",
    "Höllee",
    false,
    false
);
$cookie = $_COOKIE["Alfredo"];
If($cookie == "Wahr") {
    echo "Das Cookie ist zugelassen";
} else {
    echo "Böses Cookie!";
}

echo "<br> Der Inhalt des Cookies: $cookie";
?>

<html lang = "en">
<body>
<br>Click here to clean <a href = "../index.php" tite = "Hauptseite">Session.