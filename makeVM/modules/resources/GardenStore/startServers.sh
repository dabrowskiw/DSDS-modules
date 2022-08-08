#!/usr/bin/env bash

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
