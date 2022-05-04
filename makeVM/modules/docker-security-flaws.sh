#!/usr/bin/env bash

#Portforwarding for docker registry
vboxmanage modifyvm ${VMNAME} --natpf1 "DOCKERREGISTRY,tcp,,5500,,5000"
vboxmanage startvm "${VMNAME}" --type headless
echo "Waiting for VM to come up..."
sleep 8

echo "Copying setup.sh to vm..."
echo ""
scp -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/setup.sh root@127.0.0.1:/root/

echo "Copying config files to vm..."
scp -r -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/config root@127.0.0.1:/root/

echo "Running docker-security-flaws setup..."
echo ""
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "bash /root/setup.sh"


