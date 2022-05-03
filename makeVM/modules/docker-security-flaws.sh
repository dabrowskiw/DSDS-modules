#!/usr/bin/env bash

vboxmanage startvm "${VMNAME}" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/setup.sh root@127.0.0.1:/root/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "bash /root/setup.sh"
