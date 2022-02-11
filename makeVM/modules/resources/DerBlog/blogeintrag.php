<?php
include_once "header.php";
include_once "DB/Config.php";
include_once "Cookie.php";
session_start();
?>
    <style>
        .all-box {
            border: 5px solid cadetblue;
            padding: 10px;
        }

        .comment_field {
            resize: none;
            margin-left: 5px;
        }

        .submit_comment {
            vertical-align: super;
        }

        .blog_box {
            border: 2px solid cadetblue;
            padding: 10px;
        }

        .blog_title {
            font-size: 50px;
            font-family: serif;
            font-style: italic;
        }

        .blog_content {
            margin-bottom: 20px;
        }

        .comment_box {
            border: 2px solid cadetblue;
            width: 50%;
            margin-left: 30px;
            padding: 10px;
        }

        .comment_content {
            margin-bottom: 10px;
        }

        .comment_author_time {
            font-size: smaller;
            font-style: italic;
        }

        table, td {
            border: 1px solid black;
        }

    </style>

<?php
function echo_comment_content($content)
{
    //Wandelt php Zeilenumbrüche in html Zeilenumbrüche weil nl2br nicht funktioniert
    $text = str_replace('\r\n','<br>', $content);
    echo $text;
}

function echo_comment_info($uid, $author, $time)
{
    echo 'User ';
    echo "<a href = userProfil.php?userID=$uid >$author</a>";
    echo " posted at " . date('H:i d-m-Y', $time);
}

$conn = getConn();

$blogID = $_GET["blogID"];

$stmt = $conn->prepare("SELECT * FROM blogeinträge WHERE BlogID = ? ");
$stmt->bind_param("i", $blogID);

$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    $author = $row["Autor"];
    $time = $row["Zeitstempel"];
    $title = $row["Titel"];
    $blogger_uid = $row["UserID"];
    $content = nl2br($row["Inhalt"], true);

    ?>
    <div class="all-box">
        <div class="container blog_box">
            <div class="blog_title">
                <?php echo $title ?>
            </div>
            <div class="blog_content">
                <?php echo $content ?>
            </div>
            <div class="comment_author_time">
                <?php
                echo 'Blogger ';
                echo "<a href = userProfil.php?userID=$blogger_uid >$author</a>";
                echo " posted at " . date('H:i d-m-Y', $time);
                ?>
            </div>
        </div>
        <?php

        $comment_stmt = $conn->prepare("SELECT * FROM kommentare WHERE BlogID = ?");
        $comment_stmt->bind_param("i", $blogID);
        $comment_stmt->execute();
        $comment_result = $comment_stmt->get_result();


        ?>
        <div class="comment_field_div">
            <form id="crazy_id" class="comment_form" method="post">
                <label>
                    <textarea class="comment_field" name="comment_field"
                              placeholder="Comment here..." rows="4" cols="50" required></textarea>
                    <button form="crazy_id" class="submit_comment btn-block" type="submit"
                            name="submit_comment" onclick="history.go(0)">Submit
                    </button>
                </label>

            </form>
        </div>
        <?php
        while ($comment_row = $comment_result->fetch_assoc()) {

            $comment_author = $comment_row["Autor"];
            $comment_content = $comment_row["Inhalt"];
            $comment_time = $comment_row["Zeitstempel"];
            $comment_uid = $comment_row["UserID"];
            ?>
            <div class="container comment_box">
                <div class="comment_content">
                    <?php echo_comment_content($comment_content); ?>
                </div>
                <div class="comment_author_time">
                    <?php
                    echo_comment_info($comment_uid, $comment_author, $comment_time);
                    ?>
                </div>
            </div>
            <?php
        }
        ?>
    </div>
    <?php
}

$cookie = new Cookie();
$request_method = strtoupper($_SERVER["REQUEST_METHOD"]);
if ($request_method === "POST" && isset($_POST["submit_comment"])) {
    if ($cookie->revisedCookieVerification()) {
        $conn = getConn();
        $comment_to_submit = mysqli_real_escape_string($conn, $_POST["comment_field"]);
        $current_time = time();
        $commenter_uid = $_COOKIE["uid"];
        $commenter = "";
        $commenter_stmt = $conn->prepare("SELECT Username FROM logindaten WHERE UserID = ?");
        $commenter_stmt->bind_param("i", $commenter_uid);
        $commenter_stmt->execute();
        $commenter_result = $commenter_stmt->get_result();

        while ($commenter_row = $commenter_result->fetch_assoc()) {
            $commenter = $commenter_row["Username"];
        }
        $_SESSION["comment_to_submit"] = $comment_to_submit;
        $_SESSION["current_time"] = $current_time;
        $_SESSION["commenter_uid"] = $commenter_uid;
        $_SESSION["commenter"] = $commenter;

        $insert_comment = $conn->prepare("INSERT INTO kommentare (BlogID, Zeitstempel, Autor, Inhalt, UserID) VALUES (?, ?, ?, ?, ?)");
        $insert_comment->bind_param("iissi", $blogID, $current_time, $commenter, $comment_to_submit, $commenter_uid);
        $insert_comment->execute();
        $comment_affected_row = mysqli_affected_rows($conn);

        if ($comment_affected_row > 0) {
            echo "Successfully added comment!";
        } else {
            echo "Couldn't add comment";
        }

        ?>
        <script>location.replace("blogeintrag.php?blogID=<?php echo $blogID ?>")</script>
        <?php
        header("Location: blogeintrag.php?blogID=$blogID");
        exit();

    } else {
        echo "You must be logged in!";
    }

} elseif ($request_method === "GET") {
    if (isset($_SESSION["comment_to_submit"])) {
        $comment_to_submit = $_SESSION["comment_to_submit"];
        unset($_SESSION["comment_to_submit"]);
    }
    if (isset($_SESSION["current_time"])) {
        $current_time = $_SESSION["current_time"];
        unset($_SESSION["current_time"]);
    }
    if (isset($_SESSION["commenter_uid"])) {
        $commenter_uid = $_SESSION["commenter_uid"];
        unset($_SESSION["commenter_uid"]);
    }
    if (isset($_SESSION["commenter"])) {
        $commenter = $_SESSION["commenter"];
        unset($_SESSION["commenter"]);
    }
}
