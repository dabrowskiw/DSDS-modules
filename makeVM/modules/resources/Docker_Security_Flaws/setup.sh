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

cecho "PURPLE" "Installing dependencies..."
echo ""
apt-get -y update && apt-get -y install docker.io curl docker-compose

# could be deleted later on
cecho "PURPLE" "Verifying docker is working"
echo ""
docker run hello-world

cecho "PURPLE" "Start docker registry on port 5000..."
echo ""
docker run -d -p 5000:5000 --restart=always --name registry registry:2

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

# use exposed tcp socket for connection 
exec_start="ExecStart=/usr/sbin/dockerd -H tcp://0.0.0.0:4444 -H unix:///var/run/docker.sock"
sed -i "14s|.*|$exec_start|" /usr/lib/systemd/system/docker.service

systemctl daemon-reload
systemctl restart docker.service

 echo ""
cecho "GREEN" "Setup Postgres container"

/root/config/container_testDB/build.sh
#docker-compose up -f /config/container_testDB/docker_compose.yml -d

#docker-compose up -d -f /config/container_testDB/docker_compose.yml
docker-compose -f config/container_testDB/docker-compose.yml up -d

echo ""
cecho "GREEN" "Setup succesfull."

# cleanup setup.sh
rm -- "$0"
