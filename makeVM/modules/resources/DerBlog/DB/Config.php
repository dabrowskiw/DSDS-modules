<?php
const DB_SERVER = "localhost";
const DB_USERNAME = "autor";
const DB_PASSWORD = "qDX7Fb3TvhVYgsSj";
const DB_NAME = "der_blog";

//$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

function getConn(): bool|mysqli|null {
    return mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
}