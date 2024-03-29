#!/usr/bin/env bash

USER_DIR_NAME="mario"

vboxmanage modifyvm ${VMNAME} --natpf1 "GardenStore,tcp,,3000,,3000"
vboxmanage modifyvm ${VMNAME} --natpf1 "Backend,tcp,,8000,,8000"
vboxmanage startvm ${VMNAME} --type headless
echo "Waiting for VM to come up..."
sleep 8

# delete node_modules folder if created already to save setup time
rm -r modules/resources/GardenStore/frontend/node_modules  
rm -r modules/resources/GardenStore/backend/node_modules
rm -r modules/resources/GardenStore/userbot/node_modules

scp -P 2200 -i ${TMPDIR}/rootkey -r modules/resources/GardenStore/ root@127.0.0.1:/home/${USER_DIR_NAME}
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/${USER_DIR_NAME}/GardenStore && bash setup.sh"