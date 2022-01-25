@echo off

cls

"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" poweroff
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" snapshot "HTW-Injectable" restore "CleanInstall"
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" acpipowerbutton


echo "Running module ssh.sh..."



"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyvm "HTW-Injectable" --natpf1 "SSH,tcp,,2200,,22"
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
timeout 8


timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" acpipowerbutton
timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" poweroff
timeout 2


echo "Running module docker.sh..."
REM modules/docker.sh


"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
timeout 8

echo ssh Command execution
ssh -p 2200 -i temp/rootkey root@127.0.0.1 "apt-get update && apt-get install docker-compose -y"


timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" acpipowerbutton
timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" poweroff
timeout 2


echo "Running module 1a-akademie.sh..."
REM modules/1a-akademie.sh

"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyvm "HTW-Injectable" --natpf1 "1a-akademie,tcp,,8000,,8000"
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
timeout 8

echo scp File Transfer
scp -P 2200 -i temp/rootkey -r modules/resources/1a-akademie root@127.0.0.1:/home/mario/
echo ssh Command execution
ssh -p 2200 -i temp/rootkey root@127.0.0.1 "cd /home/mario/1a-akademie && bash setup.sh"



timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" acpipowerbutton
timeout 10 
"C:\Program Files\Oracle\VirtualBox\VBoxManage.exe" controlvm "HTW-Injectable" poweroff
timeout 2

echo Fertig
pause