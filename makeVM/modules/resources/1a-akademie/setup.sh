docker-compose up -d
echo 'php artisan migrate' | docker exec -i laravel-app bash
echo "mysql < $(<testData.sql)" | docker exec -i 1a-akademie_mysql_1 bash
