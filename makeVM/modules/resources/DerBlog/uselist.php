<?php
include_once "Cookie.php";
include_once "DB/Config.php";
include_once "header.php";

$cookie = new Cookie();
#$cookie->revisedCookieVerification();


if (!$cookie->checkAdmin()){
    echo "Insufficent Permission";
    header("Refresh: 2; URL = index.php");
} else {
    $conn = getConn();

    $stmt = $conn->prepare("SELECT * FROM user");

    $stmt->execute();
    $result = $stmt->get_result();

    echo "<style>table, th, td {
  border:1px solid black;
}</style>";
    echo "<table style=width:100%>\n";
    echo "<tr>
    <th>Username</th>
    <th>UserID</th>
    <th>Vorname</th>
    <th>Nachname</th>
    <th>Geburtstag</th>
    <th>Mail</th>
  </tr>";

    $row = mysqli_num_rows($result);

    for ($i = 0; $i < $row; $i++) {
        echo "<tr>";

        $item = $result->fetch_assoc();
        echo "<td>$item[Username]</td>";
        echo "<td><a href = 'userProfil.php?userID=$item[UserID]' >Zum User</a></td>";
        echo "<td>$item[Vorname]</td>";
        echo "<td>$item[Nachname]</td>";
        echo "<td>$item[Geburtstag]</td>";
        echo "<td>$item[Mailadresse]</td>";


        echo "</tr>\n";
    }
}
/*while (($row = mysqli_num_rows($result)) > 0) {
    echo "<tr>";
    echo "1";
    //$item=$result->fetch_assoc();
    //    echo "<td>$item</td>";
        echo "2";

    echo "</tr>\n";
}*/
echo "</table>\n";





