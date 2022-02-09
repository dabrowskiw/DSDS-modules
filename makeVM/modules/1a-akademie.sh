#!/usr/bin/env bash

vboxmanage modifyvm ${VMNAME} --natpf1 "1a-akademie,tcp,,8000,,8000"
vboxmanage startvm ${VMNAME} --type headless
echo "Waiting for VM to come up..."
sleep 8

USER_DIR_NAME="mario"

scp -P 2200 -i ${TMPDIR}/rootkey -r modules/resources/1a-akademie root@127.0.0.1:/home/${USER_DIR_NAME}/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/${USER_DIR_NAME}/1a-akademie && bash setup.sh"
