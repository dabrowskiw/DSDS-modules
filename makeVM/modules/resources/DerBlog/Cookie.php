<?php
include_once "DB/Config.php";

class Cookie
{
    private $CName = "sessions";
    #Haltbarkeit sind 30 Minuten da 3600s ne Stunde sind
    private $haltbarkeit = 1800;

    public function revisedCookieVerification(): bool{
        if (isset($_COOKIE["sessions"]) && isset($_COOKIE["uid"])) {
            $sessionValue = $_COOKIE["sessions"];
            $uid = $_COOKIE["uid"];

            $db = getConn();
            $query = $db->prepare("SELECT Zeitstempel FROM sessions WHERE UserID = ?");
            $query->bind_param("i", $uid);
            $query->execute();
            $result = $query->get_result();
            $num_rows = mysqli_num_rows($result);
            //echo "Rows: $num_rows ";

            if ($num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $dbTimestamp = $row["Zeitstempel"];
                    $cookieTime = $sessionValue / $uid;
                    $dbTime = $dbTimestamp / $uid;
                    $timeToVerify = $cookieTime - $dbTime;

                    if ($timeToVerify > 1800) {
                        echo "Your Session expired. Please Login again: ";
                        return false;
                        // header("Refresh: 2; URL = index.php");

                    } else if ($timeToVerify < 0) {
                        echo "<br>$cookieTime</br>";
                        echo "<br>$dbTime</br>";
                        echo "<br>$timeToVerify</br>";
                        echo "Invalid Cookie ";
                        return false;

                    } else {
                        $query = $db->prepare("SELECT Username FROM logindaten WHERE UserID = ?");
                        $query->bind_param("i", $uid);
                        $query->execute();
                        $result = $query->get_result();
                        $num_rows = mysqli_num_rows($result);

                        if ($num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $username = $row["Username"];
                                //echo "Welcome back $username! ";
                                //$this->updateCookie($uid, $sessionValue);
                                $this->updateCookie($uid, time()*$uid);
                                return true;
                            }
                        }
                    }
                }
            } else {
                echo "Something went wrong trying to verify your session. Try again later ";
                return false;
            }
        }
        return false;
    }

    public function checkAdmin() : bool{
        if (!isset($_COOKIE["sessions"])){
            //echo "Isn't set";
            return false;
        }

        $conn = getConn();
        $uid = $_COOKIE["uid"];
        //echo "UID: $uid";
        $query = $conn->prepare("SELECT IsAdmin FROM logindaten WHERE UserID = ?");
        $query->bind_param("i", $uid);
        $query->execute();
        $result = $query->get_result();
        $result_rows = mysqli_num_rows($result);
        $isAdmin = false;

        if ($result_rows > 0){
            while ($row=$result->fetch_assoc()){
                $isAdmin = $row["IsAdmin"];
            }
        }
        return $isAdmin;
    }

    public function createCookie(int $UserID): int
    {
        $db = getConn();
        $Inhalt = $UserID * time();
        setcookie($this ->CName, $Inhalt, time() + $this ->haltbarkeit, "/");
        $result = $this->updateCookie($UserID, $Inhalt);
        if($result == 0){
            echo "No Result";
            $sql = $db->prepare("INSERT INTO sessions (UserID, Zeitstempel) VALUES (?, ?)");
            $sql->bind_param("ii", $UserID, $Inhalt);
            $sql->execute();
            $result = $sql->get_result();
            /*  while($row=$result->fetch_assoc()){
                  $UserID = $row['UserID'];
                  echo "UserID = $UserID";
              }*/
        }
        return $UserID;
    }

    private function updateCookie(int $UserID, int|float $Inhalt): int{
        $db = getConn();
        $sql = $db->prepare("UPDATE sessions SET Zeitstempel = ? WHERE UserID = ?");
        //echo "UserID = $UserID, Inhalt: $Inhalt";
        $sql->bind_param("ii",$Inhalt , $UserID);
        $sql->execute();
        setcookie("sessions", $Inhalt, time() + 3600, "/");
        return mysqli_affected_rows($db);
    }
}