#!/usr/bin/env bash

vboxmanage startvm ${VMNAME} --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i ${TMPDIR}/rootkey -r modules/resources/Papersorg/* root@127.0.0.1:/home/mario/papersorg
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/mario/papersorg && bash setup.sh"
