# Garden Store

## Verwendung
Stelle sicher, dass die VM in VirtualBox wie in 
[DSDS-modules](https://github.com/dabrowskiw/DSDS-modules/tree/master/makeVM)
beschrieben erstellt wurde.

Um das Modul GardenStore zu installieren, muss in der modules.txt die
Zeile garden-store.sh stehen. Dann kannst du wie in 
[DSDS-modules](https://github.com/dabrowskiw/DSDS-modules/tree/master/makeVM)
das Skript makeVM.sh starten.

Alles andere passiert von selbst: Die Datei garden-store.sh kopiert
das Module in die VM und erstellt die benötigten Netzwerkrouten.
Dann wird die setup.sh auf der VM ausgeführt. Diese holt alle 
weiteren Abhängigkeiten via apt-get install, konfiguriert die Server
und startet einen User-Bot, der das Ziel für die Hack-Attacke simuliert.

Ist alles eingerichtet, kann der Server gestartet werden unter 
`/home/mario/GardenStore` mit `./startServers.sh`

Die Website sollte nun unter [localhost:3000](localhost:3000) aufrufbar sein.

## Abhängigkeiten
Alle benötigten Abhängigkeiten werden mittels setup.sh installiert.
Dazu gehört
* curl
* mariadb-server
* chromium
* nodejs (v18)
    * unteranderem mit puppeteer für den User-Bot

## User Notes

In der VM kann mittels `pm2 status` überprüft werden, ob alle Dienste laufen:
* frontend
* backend
* userbot
