<?php
$value = "say something here";
//setcookie("uid", 0, 0, "/");
?>

<?php
ob_start();
session_start();
?>

<?php
include_once "Cookie.php";
$cookie = new Cookie();

/*if (isset($_COOKIE["HackenInVMs"]) && isset($_COOKIE["uid"])){
    $isValid = $cookie->revisedCookieVerification();
    if ($isValid){
        header("Location: verifyLogin.php");
    }
}*/

// error_reporting(E_ALL);
// ini_set("display_errors", 1);
include_once "header.php";

include_once "DB/Config.php";
$conn = getConn();

$stmt = $conn->prepare("SELECT * FROM blogeinträge");


$stmt->execute();
$result = $stmt->get_result();

echo "<div class='container'>
    <style>table, td {
    border:1px solid black;
}   </style>";

$row = mysqli_num_rows($result);

    for ($i = 0; $i < $row; $i++) {
        echo "<tr>";
        $item = $result->fetch_assoc();
        $inhalt = nl2br($item["Inhalt"], true);
        echo "<td><a href = 'blogeintrag.php?blogID=$item[BlogID]' >'$item[Titel]'</a></td><br>";
        echo "<td> $inhalt</td>";
        echo "</tr><br>";
        echo "<tr>";
        echo "<td><a href = userProfil.php?userID=$item[UserID] >$item[Autor]</a></td>";
        $currentTime = date('H:i d-m-Y', $item["Zeitstempel"]);
        echo "<td> $currentTime</td>";
        echo "</tr><br><br><br>";
    }
?>
</div>

    Click here to setup the <a href = "DB/FillDBWithData.php" >"DB"</a>

</body>
