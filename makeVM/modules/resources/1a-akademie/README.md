# 1A Akademie Kurse

Kursportal für Kurse der 1A Gesundheit Akademie.

## Entwicklung

1. Installiere Docker (z.B. über [Docker Desktop](https://www.docker.com/products/docker-desktop))
1. Klone diese Repository
1. Lasse die Server-Repo über `docker-compose build` builden. Dies braucht beim ersten Start evtl. einige Minuten
1. Starte die Docker Container über `docker-compose up -d`
1. Nach dem Start müssen die Migrations ausgeführt werden - dies kann nur innerhalb des Docker Containers "laravel-app" gemacht werden.
  Führe daher `echo 'php artisan migrate' | docker exec -i laravel-app bash` im Terminal aus (oder erst `docker exec -i laravel-app bash` dann `composer install` dann `php artisan migrate`)
