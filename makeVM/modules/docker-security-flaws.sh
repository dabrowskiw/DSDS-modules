#!/usr/bin/env bash

cecho(){
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
	PURPLE="\033[0;95m" 
    # ... ADD MORE COLORS
    NC="\033[0m" # No Color
    # ZSH
    # printf "${(P)1}${2} ${NC}\n"
    # Bash
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


