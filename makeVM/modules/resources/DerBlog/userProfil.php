<?php
include_once "header.php";
//echo "Hey.\r\n";
//echo intval($_GET["userID"]);
include_once "DB/Config.php";

$db = getConn();
$query = $db->prepare("SELECT * FROM user WHERE UserID = ?");
$query->bind_param("i", $_GET["userID"]);
$query->execute();

$result = $query->get_result();
$row = mysqli_num_rows($result);
$row = $result->fetch_assoc();

echo "User: $row[Username]<br>";
echo "Name: $row[Vorname] $row[Nachname] <br>";

$cookie = new Cookie();
if($cookie -> checkAdmin()) {
    echo "Mail: $row[Mailadresse]<br>";
    echo "Geburtstag: $row[Geburtstag] <br>";
}
?>

