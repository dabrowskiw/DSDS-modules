Beispielhafte Skripte, um eine VM für penetration testing zu erstellen.

## Abhängigkeiten

 * sshpass
 * virtualbox

## Verwendung

Zunächst muss eine VM in VirtualBox erstellt werden. Konfiguration:
 
 * Name: HTW-Injectable
 * Betriebssystem: Linux - Ubuntu (64-bit)
 
In dieser VM muss eine Standard-Installation von Ubuntu 16.04.7 mit dem [64-bit Server-ISO-Image](https://releases.ubuntu.com/16.04.7/ubuntu-16.04.7-server-amd64.iso) durchgeführt werden. Bitte dabei an den entsprechenden Schritten die im Installer Optionen "No automatic updates" und (bei der Softwareselektion) "OpenSSH server" sowie "standard system utilities" auswählen.

Der Standard-user sollte "mario" heißen und das Passwort "Its4321?!" haben.

Danach muss die VM ein Mal hochgefahren werden, danach müssen folgende Einstellungen vorgenommen werden:

* Als mario einloggen, mittels ```sudo -i passwd root``` das root-Passwort auch auch "Its4321?!" setzen.
* Die Datei /etc/ssh/sshd_config bearbeiten (z.B. mit ```nano /etc/ssh/sshd_config```) und ```PermitRootLogin prohibit-password``` durch ```PermitRootLogin yes``` ersetzen.

Die VM muss danach wieder runtergefahren werden und es muss ein snapshot mit dem Namen "CleanInstall" erstellt werden. 

Nun müsste nach Start des Skripts "makeVM.sh" eine Installation von SSH, nginx, mysql und der verwundbaren Webapplikation "Diamond Real Estate" stattfinden. Wird die VM gestartet, müsste die Webseite vom host aus unter [http://127.0.0.1:8800/](http://127.0.0.1:8800/) erreichbar sein.
