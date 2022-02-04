<?php

function validator_hex() {
    return function($value) {
        if (!is_string($value)) {
            return false;
        }
        return preg_match("/^[0-9a-f]+$/", $value);
    };
}

function validator_email() {
    return function($value) {
        if (!is_string($value)) {
            return false;
        }
        return filter_var($value, FILTER_VALIDATE_EMAIL);
    };
}

function validator_username() {
    return function($value) {
        if (!is_string($value)) {
            return false;
        }
        return preg_match("/^[0-9a-zA-Z ]+$/", $value);
    };
}

function validator_password() {
    return function($value) {
        if (!is_string($value)) {
            return false;
        }
        return strlen($value) >= 8;
    };
}

?>
