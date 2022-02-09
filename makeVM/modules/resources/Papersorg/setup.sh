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

#setup mysql database
cat mysql_setup.sql | mysql --user root
sudo cp mysql.cnf ~/.my.cnf
sudo chmod 600 ~/.my.cnf

#install phpmyadmin
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.1/phpMyAdmin-5.1.1-all-languages.zip
unzip phpMyAdmin-5.1.1-all-languages.zip
sudo mv phpMyAdmin-*/ /usr/share/phpmyadmin
sudo mkdir -p /usr/share/phpmyadmin/tmp
sudo chmod -R 0755 /usr/share/phpmyadmin
sudo chown -R www-data:www-data /usr/share/phpmyadmin/tmp
cp phpmyadmin.conf /etc/apache2/conf-enabled/

#add frontend to www
rm -r /var/www/html/*
cp -rT ./www /var/www/html
cp apache2.conf /etc/apache2/apache2.conf

#generate data
sudo mkdir /var/www/html/mysqldump
python generate.py
cd chunks

for filename in *.sql; do
    cat $filename | mysql --user root -pIts4321?!
    mysqldump --databases papersorg > "/var/www/html/mysqldump/$filename"
done

sudo service apache2 restart
