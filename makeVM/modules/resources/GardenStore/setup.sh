#!/usr/bin/env bash

DB_PW='Its4321?!'

# Install Packages
printf '\n--Install packs\n'
apt-get update -y
apt-get install -y mariadb-server
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
apt-get install -y net-tools

# Setup Database Backend
printf "\n--Setup database...\n" 
cd /home/mario/GardenStore/backend/Database
mysql << EOF  # opens sub shell
create database sys;
create user mario@localhost identified by 'Its4321?!';
grant all privileges on sys.* to mario@localhost;
exit
EOF

mysql -pIts4321?! sys < create_tables.sql
mysql -pIts4321?! sys < INSERT_products_users.sql
mysql -pIts4321?! sys < INSERT_comments.sql

# Setup react
printf "\n--Setup react\n" 
cd /home/mario/GardenStore/backend
npm install pm2 -g
#install dependencies backend
npm i
cd /home/mario/GardenStore/frontend
npm i


#npm i react-scripts@5   # to solve "opensslerrorstack error 03000086 digital envelope init error"
 
# Start Servers
printf "\n--Start Server Backend\n"
cd /home/mario/GardenStore/backend
pm2 --name backend start npm -- start


printf "\n--Start Server Frontend\n"
cd /home/mario/GardenStore/frontend
pm2 --name frontend start npm -- start


pm2 ps
read -p "Press any key to exit..."
printf '\n--GardenStore is up.\n'