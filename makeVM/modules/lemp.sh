#!/usr/bin/env bash

. ${ENVFILE} 2>/dev/null

vboxmanage modifyvm ${VMNAME} --natpf1 "HTTP,tcp,,8800,,80"
vboxmanage startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i ${TMPDIR}/rootkey ${RESOURCEDIR}/lemp_script.sh root@127.0.0.1:/root/
scp -P 2200 -i ${TMPDIR}/rootkey ${RESOURCEDIR}/enable_php.txt root@127.0.0.1:/root/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "bash /root/lemp_script.sh"
