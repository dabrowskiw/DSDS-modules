<?php
require_once "database.php";
session_start();

function auth_get_user() {
    $user = $_SESSION["user"];
    return isset($user) ? $user : null;
}

function auth_login($email, $password) {
    try {
        $user = db_users_find($email, md5($password));
        $_SESSION["user"] = $user;
        return $user != null;
    } catch (Exception $e) {
        return false;
    }
}

function auth_logout() {
    unset($_SESSION["user"]);
}

function require_authed() {
    if (auth_get_user() == null) {
        header('Location: /', true, 302);
        exit();
    }
}

function require_unauthed() {
    if (auth_get_user() != null) {
        header('Location: /', true, 302);
        exit();
    }
}
?>
