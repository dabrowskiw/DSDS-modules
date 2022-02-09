<?php
require "../php/auth.php";
require "../php/rest.php";
header("Content-Type: application/json");

function download_paper() {
    $user = auth_get_user();

    if ($user == null)  {
        rest_error(401, "unauthorized access");
        return;
    }

    if (!$user["privilege"])  {
        rest_error(403, "forbidden");
        return;
    }
    $paper = db_paper($_GET["paper"]);

    if ($paper != null) {
        $filepath = "../papers/" . $paper["id"] . ".txt";
        $filename = $paper["title"] . ".txt";
        header("Content-Description: File Transfer");
        header("Content-Type: application/octet-stream");
        header('Content-Disposition: attachment; filename="'. $filename .'"');
        header("Expires: 0");
        header("Cache-Control: must-revalidate");
        header("Pragma: public");
        header("Content-Length: " . filesize($filepath));
        echo "You did it!";
    } else {
        rest_error(404, "paper not found");
    }
}

rest_controller(
    function() { download_paper(); }
);
?>
