#!/usr/bin/env bash

set -u
set -e
set -o pipefail 

# curl just now needed - delete later on
echo "Installing dependencies"
echo ""
apt-get -y update && apt-get -y install docker.io && apt-get -y install curl

# could be deleted later on
echo "Verifying docker is working"
echo ""
docker run hello-world


echo "Start docker registry on port 5000..."
echo ""
docker run -d -p 5000:5000 --restart=always --name registry registry:2

# can be deleted later on

docker ps


echo "Setting up config for unsecure docker communication"
mv /root/config/daemon.js /etc/docker


echo "pushing test image to registry"
echo ""
docker tag hello-world 127.0.0.1:5000/hello-world
docker push 127.0.0.1:5000/hello-world

echo "restarting docker registry"
echo ""
docker restart registry

# verifying local
echo "Verifying registry ist running and image was pushed successfully"
echo ""
curl -X GET http://127.0.0.1:5000/v2/_catalog

echo ""
echo "Setup succesfull."


sleep 5
poweroff


