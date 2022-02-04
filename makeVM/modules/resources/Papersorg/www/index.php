<?php
error_reporting(0);
require_once "./php/auth.php";
$user = auth_get_user();

function format_price($cents) {
    $b = floor($cents / 100);
    $f = floor($cents - $b * 100);
    $fp = str_pad(strval($f), 2, "0");
    return $b.".".$fp."€";
}

function list_papers() {
    try {
        return db_list_papers();
    } catch (Exception $e) {
        return [];
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Papers.org</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-utilities.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <?php $page = 0; include "./php/navigation.php"; ?>
    <main>
        <div class="papers">
            <table>
                <colgroup>
                    <col >
                    <col style="width: 1%;">
                    <col style="width: 1%;">
                </colgroup>
                <tbody>
                    <tr class="entry header">
                        <td>Name of Paper</td>
                        <td>Publisher</td>
                        <td>Price</td>
                    </tr>
                    <?php
                        foreach (list_papers() as $paper) {
                            echo '<tr class="entry">';
                            echo '<td class="papertitle" title="'.$paper["title"].'">'.$paper["title"].'</td>';
                            echo '<td class="publisher"><a title="'.$paper["pub_name"].'">'.$paper["pub_name"].'</a></td>';
                            echo '<td class="price">';
                            $price = format_price($paper["price"]);

                            if ($user != null) {
                                if ($user["privilege"]) {
                                    echo '<a class="btn btn-sm btn-primary" style="min-width: 64px" download href="/api/download.php?paper='.$paper["id"].'">Download</a>';
                                } else {
                                    echo '<a class="btn btn-sm btn-primary" style="min-width: 64px" data-bs-toggle="modal" data-bs-target="#buymodal">'.$price.'</a>';
                                }
                            } else {
                                echo '<a class="btn btn-sm btn-primary" style="min-width: 64px" href="/signin.php">'.$price.'</a>';
                            }
                            echo '</td></tr>';
                        }
                    ?>
                </tbody>
            </table>
        </div>
        <div id="buymodal" class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Buy Paper</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Your billing account is inactive!</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>
