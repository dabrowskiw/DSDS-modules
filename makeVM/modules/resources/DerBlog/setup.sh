sudo hwclock --hctosys

#install dependencies
sudo apt-get update -y
sudo apt-get install unzip -y
sudo apt-get install wget -y
sudo apt-get install apache2-bin apache2 -y
sudo apt-get install mariadb-server mariadb-client -y
sudo apt-get install php7.3 php7.3-mysql php7.3-gd php7.3-curl php7.3-xml php7.3-json php7.3-mbstring libapache2-mod-php7.3 -y

#setup php config
echo "extension=pdo_mysql" >> /etc/php/7.3/apache2/php.ini
mysql < db/DerBlog.sql

sudo crontab -l > cron_bkp
sudo echo "*/5 * * * * mario /var/www/html/cronjobAddComment.php >/dev/null 2>&1" >> cron_bkp
sudo crontab cron_bkp
sudo rm cron_bkp