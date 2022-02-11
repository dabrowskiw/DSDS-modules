<?php
include_once "Cookie.php";
$cookie = new Cookie();
?>
<head>
    <title>The End Blog</title>

    <style>
        /* Add some padding on document's body to prevent the content
to go underneath the header and footer */
        body {
            padding-bottom: 40px;
        }

        .form-signin {
            display: contents;
        }

        .container {
            width: 80%;
            margin: 5px; /* Center the DIV horizontally */
        }

        .fixed-header, .fixed-footer {
            width: 100%;
            background: #333;
            padding: 10px 0;
            color: #fff;
        }

        .fixed-header {
            top: 0;
        }

        .fixed-footer {
            bottom: 0;
        }

        /* Some more styles to beautify this example */
        nav a {
            color: #fff;
            text-decoration: none;
            padding: 7px 25px;
            display: inline-block;
        }

        .container p {
            line-height: 200px; /* Create scrollbar to test positioning */
        }

    </style>
</head>
<body>
<div class="fixed-header">
    <?php

    if (!$cookie->revisedCookieVerification()) {
        ?>
        <div class="container form-signin">

            <?php

            include_once "DB/Config.php";

            $msg = "";
            $conn = getConn();
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (isset($_POST["login"])) {
                    $username = mysqli_real_escape_string($conn, $_POST["username"]);
                    $password = mysqli_real_escape_string($conn, $_POST["password"]);

                    $stmt = $conn->prepare("SELECT Username, UserID FROM logindaten WHERE Username = ? AND Password = ? ");
                    $stmt->bind_param("ss", $username, $password);

                    $stmt->execute();
                    $result = $stmt->get_result();
                    $count = mysqli_num_rows($result);

                    if ($count == 1) {
                        $_SESSION["login_user"] = $username;
                        while ($row = $result->fetch_assoc()) {
                            $userid = $row['UserID'];
                            $msg = "Hello $username";
                            $cookie = new Cookie();
                            $uid = $cookie->createCookie($userid);
                            setcookie("uid", $uid, 0, "/");
                           // header("Refresh: 1; URL = index.php");
                            header("Location: index.php");
                        }
                    } else {
                        $msg = "Invalid username and password combination";
                    }
                }
            }
            ?>
        </div> <!-- /container -->

        <div class="container">

            <form class="form-signin" role="form"
                  action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);
                  ?>" method="post">
                <h4 class="form-signin-heading"><?php echo $msg; ?></h4>
                <label>
                    <input type="text" class="form-control"
                           name="username" placeholder="username = Username"
                           required autofocus>
                </label>
                <label>
                    <input type="password" class="form-control"
                           name="password" placeholder="password = Passwort" required>
                </label>
                <button class="btn btn-lg btn-primary btn-block" type="submit"
                        name="login">Login
                </button>
            </form>
            <a href="RegisterUser.php">
                <button class="btn" name="register">
                    Register
                </button>
            </a>
        </div>
        <?php
    } else {
        $uid = $_COOKIE["uid"];
        echo "
        <div class='container'>
            <nav>
                <a href='index.php'>Home</a>
                <a href='uselist.php'>Uselist</a>
                <a href='userProfil.php?userID=$uid'>Mein Profil</a>
                <a href='logout.php'>Logout</a>
            </nav>
        </div>
    ";
    }
    ?>
</div>


