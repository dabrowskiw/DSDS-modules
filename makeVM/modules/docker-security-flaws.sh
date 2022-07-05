#!/usr/bin/env bash

cecho(){
	PURPLE="\033[0;95m" 
    NC="\033[0m" # No Color
    printf "${!1}${2} ${NC}\n"
}

#Portforwarding for docker registry
vboxmanage modifyvm ${VMNAME} --natpf1 "DOCKERREGISTRY,tcp,,5500,,5000"
vboxmanage modifyvm ${VMNAME} --natpf1 "DOCKERDAEMON,tcp,,4444,,4444"
vboxmanage startvm "${VMNAME}" --type headless
cecho "PURPLE" "Waiting for VM to come up..."
sleep 8

cecho  "PURPLE" "Copying setup.sh to vm..."
echo ""
scp -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/setup.sh root@127.0.0.1:/root/

cecho "PURPLE" "Copying config files to vm..."
scp -r -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/config root@127.0.0.1:/root/

cecho "PURPLE" "Running docker-security-flaws setup..."
echo ""
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "bash /root/setup.sh"


