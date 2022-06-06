#!/usr/bin/env bash

set -ueo pipefail

cecho(){
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
	PURPLE="\033[0;95m" 
    NC="\033[0m" # No Color
    printf "${!1}${2} ${NC}\n"
}



# curl just now needed - delete later on
cecho "PURPLE" "Installing dependencies..."
echo ""
apt-get -y update && apt-get -y install docker.io && apt-get -y install curl

# could be deleted later on
cecho "PURPLE" "Verifying docker is working"
echo ""
docker run hello-world


cecho "PURPLE" "Start docker registry on port 5000..."
echo ""
docker run -d -p 5000:5000 --restart=always --name registry registry:2

# can be deleted later on

docker ps


cecho "PURPLE" "Setting up config for unsecure docker communication"
mv /root/config/daemon.js /etc/docker


cecho "PURPLE" "pushing test images to registry..."
echo ""
docker pull alpine
docker tag alpine 127.0.0.1:5000/alpine
docker push 127.0.0.1:5000/alpine
docker tag hello-world 127.0.0.1:5000/hello-world
docker push 127.0.0.1:5000/hello-world

cecho "PURPLE" "restarting docker registry..."
echo ""
docker restart registry

# verifying local
cecho "PURPLE" "Verifying registry is running and image was pushed successfully..."
echo ""
curl -X GET http://127.0.0.1:5000/v2/_catalog

echo ""
cecho "GREEN" "Setup succesfull."


# cleanup setup.sh
rm -- "$0"
