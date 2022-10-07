#!/usr/bin/env bash

vboxmanage modifyvm ${VMNAME} --natpf1 "HTTP2,tcp,,8081,,8081"
vboxmanage modifyvm ${VMNAME} --natpf1 "HTTP,tcp,,8080,,8080"
vboxmanage startvm ${VMNAME} --type headless
echo “Waiting for VM to come up…“
sleep 8
scp -P 2200 -i ${TMPDIR}/rootkey -r modules/resources/xss2/* root@127.0.0.1:/home/mario/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/mario/ && bash setup.sh"
