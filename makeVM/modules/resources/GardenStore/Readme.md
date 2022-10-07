# Garden Store

## Beschreibung des Settings

Der Gardenstore ist eine vulnerable Webseite, die auf einem React-Frontend mit einem Node-Backend läuft.
Der Angreifer erstellt sich einen Account auf der Webseite über den Register-Button. 
Über diesen Account kann er sich anmelden und einen Kommentar auf einer der Produktseiten mit Schadcode hinterlassen. 
Im selben Moment meldet sich automatisch (mit puppeteer) der User Neville auf der Anwendung an. 
Der Angreifer kann nun via netcat auf seinem Rechner den Session-Cookie von Neville abfangen. 
Der Cookie kann dann über ein Browser-Addon z.B. Cookie-Editor verwendet werden, um sich als Neville auf der Webseite einzuloggen, um dann sensible Daten zu erspähen. 

## Verwendung

1. Um das Modul GardenStore zu installieren, muss in der modules.txt die
Zeile `garden-store.sh` stehen! Die anderen Module können bis auf die erste Zeile ssh.sh auskommentiert werden.

2. DANACH kannst du wie in
[DSDS-modules](https://github.com/dabrowskiw/DSDS-modules/tree/master/makeVM)
beschrieben die VM in VirtualBox erstellen und das Skript `makeVM.sh` starten
(ruft die modules.txt auf).

Alles andere passiert von selbst: Die Datei garden-store.sh kopiert
das Modul in die VM (mittels scp) und erstellt die benötigten Netzwerkrouten.
Dann wird die setup.sh auf der VM gestartet. Diese holt alle
weiteren Abhängigkeiten via apt-get install, konfiguriert die Server mit der
Datenbank und startet einen User-Bot, der das Ziel für die Hack-Attacke simuliert.

3. Ist alles eingerichtet, kann der Server in der VM (als root) gestartet werden unter `/home/mario/GardenStore` mit `./startServers.sh`.

Die Website sollte nun auf deinem Host-PC unter [localhost:3000](localhost:3000) aufrufbar sein.

## Abhängigkeiten

Alle benötigten Abhängigkeiten werden automatisch mittels setup.sh installiert.
Dazu gehören

* mariadb-server (für die Datenbank)
* curl (um NodeJS zu holen)
* nodejs v18 (für die Server)
  * unteranderem mit puppeteer für den User-Bot
* chromium (für den User-Bot)

## Appendix

In der VM kann mittels `pm2 status` überprüft werden, ob alle Dienste laufen:

* frontend
* backend
* userbot

pm2 übernimmt die Server-Starts. Server manuell starten mit:

1. npm i - install everything locally
2. npm start - start server (im jeweiligen Verzeichnis frontend oder backend aufrufen) oder npm run dev - start mit nodemon

## Authors

* [@butburg](https://www.github.com/octokatherine)
* [@simontree](https://github.com/simontree)