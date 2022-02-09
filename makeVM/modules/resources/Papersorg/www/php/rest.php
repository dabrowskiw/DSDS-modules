<?php
require_once "validation.php";

function rest_send($obj) {
    http_response_code(200);
    echo json_encode($obj);
    exit(0);
}

function rest_error($code, $message) {
    http_response_code($code);
    echo json_encode(["error"=>$message]);
    exit(0);
}

function rest_validate($value, $validator) {
    $valid = $validator($value);
    
    if (!$valid) {
        rest_error(400, "invalid input parameters");
    }
    return $value;
}

function rest_controller($get = null, $post = null, $put = null, $delete = null) {
    $method = $_SERVER["REQUEST_METHOD"];

    try {
        if ($method === "GET" && $get != null) $get();
        else if ($method === "POST" && $post != null) $post();
        else if ($method === "PUT" && $put != null) $put();
        else if ($method === "DELETE" && $delete != null) $delete();
        else rest_error(400, "unknown rest method");    
    } catch (Exception $e) {
        rest_error(500, "server failure");
    }
}

?>
