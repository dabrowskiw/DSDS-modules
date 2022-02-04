<?php

function db_mysql() {
    static $mysql = null;

    if ($mysql === null) {
        $mysql = new PDO('mysql:host=localhost;dbname=papersorg', 'root', 'Its4321?!');
    }
    return $mysql;
}

function db_list_papers() {
    $statement = db_mysql()->prepare('SELECT p.id, p.title, p.publisher as pub_id, u.name as pub_name, p.price FROM `papers` as p, `users` as u WHERE p.publisher=u.id');
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function db_paper($paperId) {
    $statement = db_mysql()->prepare('SELECT p.id, p.title, p.publisher as pub_id, u.name as pub_name, p.price FROM `papers` as p, `users` as u WHERE p.id=?');
    $statement->execute(array($paperId));
    return $statement->fetch(PDO::FETCH_ASSOC);
}

function db_papers_by($userId) {
    $statement = db_mysql()->prepare("SELECT id, title, price FROM `papers` WHERE publisher=?");
    $statement->execute(array($userId));
    return $statement->fetchAll(PDO::FETCH_ASSOC);
}

function db_users_register($name, $email, $password) {
    $userId = bin2hex(random_bytes(8));
    $hash = md5($password);
    $statement = db_mysql()->prepare("INSERT INTO `users` VALUES (?,?,?,0,?)");
    
    if (!$statement->execute(array($userId, $email, $name, $hash))) {
        return null;
    }
    return $userId;
}

function db_users_find($email, $hash) {
    $statement = db_mysql()->prepare("SELECT id, email, name, privilege FROM `users` WHERE email=? AND password=?");
    $statement->execute(array($email, $hash));
    return $statement->fetch(PDO::FETCH_ASSOC);
}

?>
