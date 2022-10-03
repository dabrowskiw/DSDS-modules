#/bin/bash

rm /usr/share/downloaded_cat_pictures/*
cd /home/cat_miner/
wget -i ./cat_servers.txt -P /usr/share/downloaded_cat_pictures
cd /usr/share/downloaded_cat_pictures
tar czf /tmp/backup.tar.gz *
