#!/usr/bin/env bash

set -ueo pipefail

cecho(){
    RED="\033[0;31m"
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
	PURPLE="\033[0;95m" 
    NC="\033[0m" # No Color
    printf "${!1}${2} ${NC}\n"
    echo ""
}    

setup_registry(){
    cecho "PURPLE" "Start docker registry on port 5000..."
    docker run -d -p 5000:5000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --name registry registry:2
    cecho "PURPLE" "Setting up config for insecure docker communication"
    mv /root/config/daemon.js /etc/docker

    setup_images

    cecho "PURPLE" "restarting docker registry..."
    docker restart registry
    cecho "PURPLE" "Verifying registry is running and images were pushed successfully..."
    curl -X GET http://127.0.0.1:5000/v2/_catalog
}

setup_images(){
    cecho "PURPLE" "Building and pushing images to registry"
    docker run hello-world
    docker build ./config/workstation --tag 'workstation'
    docker pull alpine
    docker tag workstation 127.0.0.1:5000/workstation
    docker tag alpine 127.0.0.1:5000/alpine
    docker tag hello-world 127.0.0.1:5000/hello-world
    docker push 127.0.0.1:5000/workstation
    docker push 127.0.0.1:5000/alpine
    docker push 127.0.0.1:5000/hello-world
}

setup_socket(){
    exec_start="ExecStart=/usr/sbin/dockerd -H tcp://0.0.0.0:4444 -H unix:///var/run/docker.sock"
    sed -i "14s|.*|$exec_start|" /usr/lib/systemd/system/docker.service

    systemctl daemon-reload
    systemctl restart docker.service
}

setup_ssh(){
    cecho "PURPLE" "Open ssh"
    echo -e 'password1267\npassword1267' | passwd
    cp /root/config/sshd_config /etc/ssh/sshd_config
    service ssh start
}

setup_postgres(){
    cecho "GREEN" "Setup Postgres container"
    /root/config/container_testDB/build.sh
    docker-compose -f config/container_testDB/docker-compose.yml up -d
    cecho "GREEN" "Setup succesfull."
}

cecho "PURPLE" "Installing dependencies..."
apt-get -y update && apt-get -y install docker.io curl docker-compose

setup_registry
setup_socket
setup_ssh
setup_postgres

# cleanup setup.sh
rm -- "$0"
