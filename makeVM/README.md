Beispielhafte Skripte, um eine VM für penetration testing zu erstellen.

## Abhängigkeiten

 * sshpass
 * virtualbox

## Verwendung

Zunächst muss eine VM in VirtualBox erstellt werden. Konfiguration:
 
 * Name: HTW-Injectable
 * Betriebssystem: Linux - Ubuntu (64-bit)
 
In dieser VM muss eine Standard-Installation von Ubuntu 18.04.5 mit dem [64-bit ISO-Image](https://releases.ubuntu.com/18.04.5/ubuntu-18.04.5-desktop-amd64.iso) durchgeführt werden. Bitte dabei die im Installer Option "Minimal installation" auswählen und "Downlaod updates while installing Ubuntu" deaktivieren.

Der Standard-user sollte "mario" heißen und das Passwort "Its4321?!" haben.

Danach muss die VM ein Mal hoch- und wieder runtergefahren werden und ein snapshot mit dem Namen "CleanInstall" erstellt werden. 

Nun müsste nach Start des Skripts "makeVM.sh" eine Installation von SSH, nginx, mysql und der verwundbaren Webapplikation "Diamond Real Estate" stattfinden. Wird die VM gestartet, müsste die Webseite vom host aus unter [http://127.0.0.1:8800/](http://127.0.0.1:8800/) erreichbar sein.
