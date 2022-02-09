<?php
error_reporting(0);
require_once "./php/auth.php";
require_once "./php/validation.php";
require_unauthed();

$name = $_POST["name"];
$email = $_POST["email"];
$password = $_POST["pwd"];
$invalid_name = false;
$invalid_email = false;
$invalid_password = false;
$show_error = false;

if (isset($name) && isset($email) && isset($password)) {
    $lower_email = strtolower($email);
    $invalid_name = !validator_username()($name);
    $invalid_email = !validator_email()($lower_email);
    $invalid_password = !validator_password()($password);

    if (!($invalid_name || $invalid_email || $invalid_password)) {
        if (db_users_register($name, $lower_email, $password)) {
            header('Location: /signin.php', true, 302);
        } else {
            $show_error = true;
        }
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
    <div class="container vh-100">
        <div class="row justify-content-center align-items-center" style="height: 80%">
            <form class="signin px-4 py-2" method="post">
                <h2 class="mt-3 mb-5">Registration</h2>
                <div class="mb-3">
                    <label class="form-label">Username</label>
                    <input name="name" type="text" value="<?=$name?>" class="form-control <?=$invalid_name ? 'is-invalid' : ''?>" placeholder="John Doe">
                    <?=$invalid_name ? '<small class="error">The provided name may contain illegal characters</small>' : ''?>
                </div>
                <div class="mt-2 mb-3">
                    <label class="form-label">Email</label>
                    <input name="email" type="email" value="<?=$email?>" class="form-control <?=$invalid_email ? 'is-invalid' : ''?>" placeholder="name@example.com">
                    <?=$invalid_email ? '<small class="error">Please enter a valid email address</small>' : ''?>
                </div>
                <div class="mb-5">
                    <label class="form-label">Password</label>
                    <input name="pwd" type="password" class="form-control <?=$invalid_password ? 'is-invalid' : ''?>">
                    <?=$invalid_password ? '<small class="error">A password must be at least 8 characters long</small>' : ''?>
                </div>
                <div class="d-flex mb-2 gap-2">
                    <button type="submit" class="btn btn-primary" style="width: 8rem; margin-left: auto;">Sign up</button>
                </div>
            </form>
        </div>
    </div>
    <script src="js/bootstrap.bundle.min.js"></script>
</body>

</html>
