
vboxmanage startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i temp/rootkey -r modules/resources/DiamondRealEstate/* root@127.0.0.1:/var/www/html/
scp -P 2200 -i temp/rootkey -r modules/resources/dre.sql root@127.0.0.1:/root/
scp -P 2200 -i temp/rootkey -r modules/resources/dre_script.sh root@127.0.0.1:/root/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "bash /root/dre_script.sh"
