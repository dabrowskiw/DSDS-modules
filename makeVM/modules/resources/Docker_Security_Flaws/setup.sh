#!/usr/bin/env bash


# curl just now needed - delete later on
apt-get -y update && apt-get -y install docker.io && apt-get -y install curl

# could be deleted later on
docker run hello-world

docker run -d -p 5000:5000 --restart=always --name registry registry:2

# can be deleted later on
docker ps


scp -r -P 2200 -i temp/rootkey -r modules/resources/Docker_Security_Flaws/config/daemon.js root@127.0.0.1:/etc/docker/

# pushing test image to registry
docker tag hello-world 127.0.0.1:5000/hello-world
docker push 127.0.0.1:5000/hello-world
docker restart registry

# verifying local
curl -X GET http://127.0.0.1:5000/v2/_catalog




