<?php
ob_start();
session_start();
?>

<?php
// error_reporting(E_ALL);
// ini_set("display_errors", 1);
?>

<html lang = "en">

<head>
    <title>HackerWhatever.com</title>
    <link href = "css/bootstrap.min.css" rel = "stylesheet">

    <style>
        body {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #ADABAB;
        }

        .form-signin {
            max-width: 330px;
            padding: 15px;
            margin: 0 auto;
            color: #017572;
        }

        .form-signin .form-signin-heading,
        .form-signin .checkbox {
            margin-bottom: 10px;
        }

        .form-signin .checkbox {
            font-weight: normal;
        }

        .form-signin .form-control {
            position: relative;
            height: auto;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 10px;
            font-size: 16px;
        }

        .form-signin .form-control:focus {
            z-index: 2;
        }

        .form-signin input[type="email"] {
            margin-bottom: -1px;
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;
            border-color:#017572;
        }

        .form-signin input[type="password"] {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-color:#017572;
        }

        h2{
            text-align: center;
            color: #017572;
        }
    </style>

</head>

<body>

<h2>Enter Username and Password</h2>
<div class = "container form-signin">

    <?php
    include "Cookie.php";
    include_once "DB/Config.php";

    $msg = "";
    $conn = getConn();
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $username = mysqli_real_escape_string($conn, $_POST["username"]);
        $password = mysqli_real_escape_string($conn, $_POST["password"]);
        $email = mysqli_real_escape_string($conn, $_POST["email"]);
        $confirmPassword = $_POST["confirmPassword"];

        if ($password == $confirmPassword){
            $isAdmin = intval(false);
            $query = $conn->prepare("INSERT INTO logindaten (Username, Password, IsAdmin) VALUES (?, ?, ?)");
            $query->bind_param("ssi", $username, $password, $isAdmin);
            $query->execute();
            //echo "Inserted UserID from query: $query->insert_id, Inserted UserID from Conn: $conn->insert_id";

            if ($query->errno == 1062){
                echo "Username already exists";
            } else{
                $userID = $conn->insert_id;
                $userInfoQuery = $conn->prepare("INSERT INTO user (Username, UserID, Mailadresse) VALUES (?, ?, ?)");
                $userInfoQuery->bind_param("sis", $username, $userID, $email);
                $userInfoQuery->execute();
                $affectedRows = mysqli_affected_rows($conn);

                if ($affectedRows > 0){
                    echo "Successfully created Account!";
                    header("Refresh: 2; URL = index.php");
                } else{
                    echo "Something went wrong creating your account";
                    echo "Error: $userInfoQuery->error";
                }
            }
        } else {
            echo "Password confirmation must match Password!";
        }
    }
    ?>
</div> <!-- /container -->

<div class = "container">

    <form class = "form-signin" role = "form"
          action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']);
          ?>" method = "post">
        <h4 class = "form-signin-heading"><?php echo $msg; ?></h4>
        <input type = "text" class = "form-control"
               name = "username" placeholder = "Enter Username"
               required autofocus>
        <input type = "password" class = "form-control"
               name = "password" placeholder = "Enter Password required">
        <input type="password" class="form-control"
               name="confirmPassword" placeholder="Confirm Password" required>
        <input type="email" name="email" class="form-control" placeholder="Enter E-Mail (Optional)">
        <button class = "btn btn-lg btn-primary btn-block" type = "submit"
                name = "login">Register</button>
    </form>

   Return to <a href = "index.php" >Homepage</a>.
</div>

</body>
</html>