#!/usr/bin/env bash

# Install dependencies 
printf "\n--Install dependencies\n"
cd ../backend
npm i
cd ../frontend
npm i

# Start Servers
printf "\n--Start Server Backend\n"
cd ../backend
npm run start &

printf "\n--Start Server Frontend\n"
cd ../frontend
npm run start &

printf '\n--GardenStore is up.\n'