# create user cat_miner
apt-get install useradd
/usr/sbin/useradd -m cat_miner -s /bin/bash

# set weak password for cat_miner
echo "cat_miner:cat" | chpasswd

#update
apt-get update

#install pip
apt-get install -y python3-pip

#install crypto
pip3 install pycryptodome

# set SUID bit for base64
chmod u+s /usr/bin/base64

# create download folder for cronjob
mkdir /usr/share/downloaded_cat_pictures
chmod 744 /usr/share/downloaded_cat_pictures

# create archive folder for cat pictures
mkdir /usr/share/cat_pictures_archive
mv ./catpics/* /usr/share/cat_pictures_archive/
chmod 755 /usr/share/cat_pictures_archive/*

# move server list to user cat_miner
mv ./cat_servers.txt /home/cat_miner/

# move cronjob to bin folder
mv ./cat_picture_maintenance.sh /usr/local/bin/

# move hints to marios homefolder
mv ./hints /home/mario/


# crypt tool
mkdir /usr/local/bin/crypt
mv aes.py /usr/local/bin/crypt/
mv wrapper.py /usr/local/bin/crypt/
chmod 744 /usr/local/bin/crypt/aes.py
chmod 744 /usr/local/bin/crypt/wrapper.py


# create cronjob
echo '0-59 * * * * root sh /usr/local/bin/cat_picture_maintenance.sh' >> /etc/crontab
echo '0-59 * * * * root python3 /usr/local/bin/crypt/wrapper.py' >> /etc/crontab


# remove source folder
rm -r ../privilege_escalation
