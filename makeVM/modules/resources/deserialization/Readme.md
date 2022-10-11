# Deserialization

## Szenario

John schreibt Dokumentationen für eine Softwarefirma, die die Produktivität ihrer Mitarbeiter während der Arbeitszeit überwachen lässt. Dazu wird eine selbst geschriebene Java-Software verwendet. Zufällig sitzt du mit John im selben Café, und ihr seid beide über das offene W-LAN mit dem Internet verbunden. 

Der Netzwerkverkehr wird bei dieser VM über den Host geschickt und lässt sich dadurch mitschneiden.

## Installation

In der Datei `modules.txt` müssen die folgenden Module aktiviert sein:
```
ssh.sh
deserialization.sh
```

Das Skript ermittelt automatisch die lokale IP-Adresse des Host-Computers. Falls es dabei in deinem Netzwerk zu einem Fehler kommt, kannst du die lokale IP-Adresse im Skript `deserialization.sh` manuell einfügen (Zeile 3).

---

<details>
	<summary>Hilfestellung</summary>
	Unter <a href="http://localhost:8123">localhost:8123</a> kannst du auf das Webinterface der Produktivitätssoftware zugreifen, um die Logs beobachten zu können.
</details>

[Zum Lösungsweg](Lösungsweg.md)
