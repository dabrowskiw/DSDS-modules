#!/usr/bin/env bash

vboxmanage startvm ${VMNAME} --type headless
echo "Waiting for VM to come up..."
sleep 8

ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "echo 'kernel.randomize_va_space = 0' >> /etc/sysctl.conf"

