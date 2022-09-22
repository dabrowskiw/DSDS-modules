#!/usr/bin/env bash

# Start Servers
printf "\n--Start Server Backend\n"
cd /home/mario/GardenStore/backend
pm2 --name backend start npm -- start

printf "\n--Start Server Frontend\n"
cd /home/mario/GardenStore/frontend
pm2 --name frontend start npm -- start

printf '\n--GardenStore is up.\n'

# Start userbot
printf "\n--Start userBot 'neville'\n"
cd /home/mario/GardenStore/userbot
pm2 --name userbot start node -- autouser.js