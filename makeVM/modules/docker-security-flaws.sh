#!/usr/bin/env bash

vboxmanage startvm "${VMNAME}" --type headless
echo "Waiting for VM to come up..."
sleep 8


ssh -p 2200 -i "${TMPDIR}"/rootkey root@127.0.0.1 "apt-get -y update && apt-get -y install docker.io"

ssh -p 2200 -i "${TMPDIR}"/rootkey root@127.0.0.1 "docker run hello-world"

ssh -p 2200 -i "${TMPDIR}"/rootkey root@127.0.0.1 "docker run -d -p 5000:5000 --restart=always --name registry registry:2"

ssh -p 2200 -i "${TMPDIR}"/rootkey root@127.0.0.1 "docker ps"


