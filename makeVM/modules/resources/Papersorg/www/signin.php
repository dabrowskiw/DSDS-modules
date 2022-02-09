<?php
error_reporting(0);
require_once "./php/auth.php";
require_once "./php/validation.php";
require_unauthed();

$email = $_POST["email"];
$password = $_POST["pwd"];
$invalid_email = false;
$invalid_password = false;
$show_error = false;

if (isset($email) && isset($password)) {
    $lower_email = strtolower($email);
    $invalid_email = !validator_email()($lower_email);
    $invalid_password = !validator_password()($password);

    if (!($invalid_email || $invalid_password)) {
        if (auth_login($lower_email, $password)) {
            header('Location: /', true, 302);
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
            <h2 class="mt-3 mb-5">Account Login</h2>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input name="email" type="email" class="form-control <?=$invalid_email ? 'is-invalid' : ''?>">
                    <?=$invalid_email ? '<small class="error">Please enter a valid email address</small>' : ''?>
                </div>
                <div class="mb-2">
                    <label class="form-label">Password</label>
                    <input name="pwd" type="password" class="form-control <?=$invalid_password ? 'is-invalid' : ''?>">
                    <?=$invalid_password ? '<small class="error">Please enter a password</small>' : ''?>
                </div>
                <?=$show_error ? '<small class="error">Invalid email or password</small>' : ''?>
                <div class="d-flex mt-5 mb-2 gap-2">
                    <a href="/signup.php" class="btn btn-outline-primary" role="button" style="width: 8rem; margin-left: auto;">Register</a>
                    <button type="submit" class="btn btn-primary" style="width: 8rem">Sign In</button>
                </div>
            </form>
        </div>
    </div>
    <script src="js/bootstrap.bundle.min.js"></script>
</body>

</html>
