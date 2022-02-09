# 1A Akademie Kurse

Kursportal für Kurse der 1A Gesundheit Akademie.

## VM Setup

Setze diesen Inhalt in modules.txt ein:
```
ssh.sh
docker.sh
phpmyadmin.sh
1a-akademie.sh
```

## Entwicklung

1. Installiere Docker (z.B. über [Docker Desktop](https://www.docker.com/products/docker-desktop)) und docker-compose
2. Klone diese Repository
3. Lasse die Server-Repo über `docker-compose build` builden. Dies braucht beim ersten Start evtl. einige Minuten
4. Starte die Docker Container über `docker-compose up -d`
5. Nach dem Start müssen die Migrations ausgeführt werden - dies kann nur innerhalb des Docker Containers "laravel-app" gemacht werden.
  Führe daher `echo 'php artisan migrate' | docker exec -i laravel-app bash` im Terminal aus (oder erst `docker exec -i laravel-app bash` dann `composer install` dann `php artisan migrate`)

## Verwendung

Zur verwendung unter Windows gibt es eine spezielle `1a_akademie_windows.bat`, womit auch unter windows die VM erstellt werden kann.

Es ist erforderlich dass das modul `docker` vor dem modul `1a-akademie` geladen wird. Zusätzlich ist das Modul `phpmyadmin` integrierbar.

Erreichbar ist die Anwendung dann unter `http://localhost:8000/`
