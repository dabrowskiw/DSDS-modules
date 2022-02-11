<?php include_once "DB/Config.php";
session_start();

function include_comment($comment_counter){
    $conn = getConn();
    $current_time = time();
    $stmt = $conn->prepare("SELECT BlogID FROM blogeinträge ORDER BY RAND() LIMIT 1");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0){
        while ($row = $result->fetch_assoc()){
            $blogID = $row["BlogID"];
        }
    }

    $admin_stmt = $conn->prepare("SELECT Username, UserID FROM logindaten WHERE IsAdmin = 1 ORDER BY RAND() LIMIT 1");
    $admin_stmt->execute();
    $admin_result = $admin_stmt->get_result();

    if ($admin_result->num_rows > 0){
        while ($admin_row = $admin_result->fetch_assoc()){
            $admin_name = $admin_row["Username"];
            $admin_uid = $admin_row["UserID"];
        }
    }

    $comment_content = "Das ist Kommentar Nummer $comment_counter";

    $insert_comment = $conn->prepare("INSERT INTO kommentare (BlogID, Zeitstempel, Autor, Inhalt, UserID) VALUES (?, ?, ?, ?, ?)");
    $insert_comment->bind_param("iissi", $blogID, $current_time, $admin_name, $comment_content, $admin_uid);
    $insert_comment->execute();

    update_session($admin_uid, $current_time);
}

function update_session(int $uid, int|float $timestamp){
    $conn = getConn();
    $stmt = $conn->prepare("UPDATE sessions SET Zeitstempel = ? WHERE UserID = ?");
    $stmt->bind_param("ii", $timestamp, $uid);
    $stmt->execute();
}

if ($_SERVER["REQUEST_METHOD"] === "GET"){
    if (isset($_SESSION["comment_counter"])){
        $counter = $_SESSION["comment_counter"];
        include_comment(++$counter);
        $_SESSION["comment_counter"] = $counter;
    } else {
        include_comment(1);
        $_SESSION["comment_counter"] = 1;
    }
}