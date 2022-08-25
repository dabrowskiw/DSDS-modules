#!/usr/bin/env bash

DB_PW='Its4321?!'

# Install Packages
printf '\n--Install packs\n'
apt-get update -y
apt-get install -y mariadb-server
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Setup Database Backend
printf "\n--Setup database\n" 
cd backend/Database
# mysql << EOF
create database sys;
create user mario@localhost identified by 'Its4321?!';
grant all privileges on sys.* to mario@localhost;
exit

mysql -p sys < create_tables.sql
Its4321?!       # enter password to execute sql-file
mysql -p sys < INSERT_products_users.sql
Its4321?!       # enter password to execute sql-file
mysql -p sys < INSERT_comments.sql
Its4321?!       # enter password to execute sql-file

cd ../..
#install dependencies backend
npm i
cd ../frontend
npm i
npm i react-scripts@5   # to solve "opensslerrorstack error 03000086 digital envelope init error"
 
# Start Servers
printf "\n--Start Server Backend\n"
cd ../backend
npm run start &

printf "\n--Start Server Frontend\n"
cd ../frontend
npm run start &

printf '\n--GardenStore is up.\n'