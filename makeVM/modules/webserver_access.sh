#!/bin/bash

vboxmanage startvm "HTW-InjectableOld" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i temp/rootkey -r resources/webserver_access/* root@127.0.0.1:/home/mario
#ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd /home/mario/DerBlog && bash setup.sh"
ssh -p 2200 root@127.0.0.1 "apt -y update; apt -y install build-essential binutils; apt -y install gcc-multilib"
ssh -p 2200 root@127.0.0.1 "dpkg --add-architecture i386; apt update; apt install libc6-i386"
ssh -p 2200 root@127.0.0.1 "mkdir -p /var/www"
ssh -p 2200 root@127.0.0.1 "gcc -m32 -z execstack -no-pie -fno-stack-protector /home/mario/webserver_access.c"
ssh -p 2200 root@127.0.0.1 "echo 0 | sudo tee /proc/sys/kernel/randomize_va_space"
ssh -p 2200 root@127.0.0.1 "ichmod a+x /home/mario/a.out; chmod u+s /home/mario/a.out"
