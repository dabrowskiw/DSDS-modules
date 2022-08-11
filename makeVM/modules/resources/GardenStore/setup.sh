#!/usr/bin/env bash

#install global dependencies
apt-get update -y

apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_18.x | bash -
apt install nodejs

# setup database 
apt-get install mariadb-server

cd backend/Database

mysql
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

cd backend
#install dependencies backend
npm i
#start backend
npm run start

cd ../frontend
#install dependencies frontend
npm i
#start frontend
npm run start
