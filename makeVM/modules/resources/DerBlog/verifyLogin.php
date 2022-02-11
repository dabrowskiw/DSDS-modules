<?php
    include_once "Cookie.php";
    $cookie = new Cookie();
    $isAdmin = $cookie->checkAdmin();

    if ($isAdmin){
        header("Location: uselist.php");
    } else {
        header("Location: userProfil.php"); //TODO userID mitgeben
    }