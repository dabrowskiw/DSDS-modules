chmod -R 777 ./

docker-compose up -d

echo 'composer install' | docker exec -i laravel-app bash
sleep 30 # required

echo 'php artisan migrate' | docker exec -i laravel-app bash

docker cp ImportData.sql laravel-app:/var/www/html/public/ImportData.sql
echo 'php artisan db:seed --class=SqlFileSeeder' | docker exec -i laravel-app bash # executes ImportData.sql
docker exec -i laravel-app rm /var/www/html/public/ImportData.sql
