Beispielhafte Skripte, um eine VM für penetration testing zu erstellen.

## Abhängigkeiten

 * sshpass
 * virtualbox

## Verwendung

Zunächst muss eine VM in VirtualBox erstellt werden. Konfiguration:
 
 * Name: HTW-Injectable
 * Betriebssystem: Linux - Debian (64-bit)
 
In dieser VM muss eine Standard-Installation von Debian 10.8.0 mit dem [64-bit ISO-Image](https://cdimage.debian.org/mirror/cdimage/archive/10.8.0/amd64/iso-cd/debian-10.8.0-amd64-netinst.iso) durchgeführt werden. Dabei am besten den text-basierten Installer nutzen, nicht den graphischen - zweiterer funktioniert in VMWare nicht zuverlässig. Bitte dabei an den entsprechenden Schritten im Installer die folgenden Optionen verwenden (hier stehen nur Abweichungen vom Standard):
 * root password: ```Its4321?!```
 * Standard-Account: ```mario```
 * Passwort des Standard-Accounts: ```Its4321?!```
 * In der Software selection: Nur "SSH server" und "standard system utilities" auswählen
 * Bei "Device for boot loader installation": Das vorgeschlagene device wählen (vermutlich ```/dev/sda```)

Danach muss die VM ein Mal hochgefahren werden, danach müssen folgende Einstellungen vorgenommen werden:

* Als root einloggen, 
* Die Datei /etc/ssh/sshd_config bearbeiten (z.B. mit ```nano /etc/ssh/sshd_config```) und ```#PermitRootLogin prohibit-password``` durch ```PermitRootLogin yes``` ersetzen (in nano: zum Speichern Strg-O, zum Beenden Strg-X drücken - in der Leiste unten stehen die Tastenkombinationen, "^" heißt dabei "Strg").

Die VM muss danach wieder runtergefahren werden (z.B. durch den Befehl ```poweroff``` als root) und es muss ein snapshot mit dem Namen "CleanInstall" erstellt werden. 

Nun müsste nach Start des Skripts "makeVM.sh" eine Installation von SSH, nginx, mysql und der verwundbaren Webapplikation "Diamond Real Estate" stattfinden. Wird die VM gestartet, müsste die Webseite vom host aus unter [http://127.0.0.1:8800/](http://127.0.0.1:8800/) erreichbar sein.
