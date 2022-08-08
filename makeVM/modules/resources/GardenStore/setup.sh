#!/usr/bin/env bash

#install global dependencies
apt-get update -y

apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_18.x | bash -
apt install nodejs


cd backend
#install dependencies backend
npm i
#start backend
npm run start

cd ../frontend
#install dependencies frontend
npm i
#start frontend
npm start
