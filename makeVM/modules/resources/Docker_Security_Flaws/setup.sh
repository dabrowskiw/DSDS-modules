#!/usr/bin/env bash

apt-get -y update && apt-get -y install docker.io

docker run hello-world

docker run -d -p 5000:5000 --restart=always --name registry registry:2

docker ps

