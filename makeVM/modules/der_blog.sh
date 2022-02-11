#!/usr/bin/env bash

vboxmanage startvm "HTW-Injectable-Ein-Blog" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i temp/rootkey -r modules/resources/DerBlog/* root@127.0.0.1:/var/www/html/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/mario/DerBlog && bash setup.sh"
