#install dependencies

apt-get update -y
apt-get install default-jre -y
apt-get install default-jdk -y
apt install maven -y
apt install firefox-esr -y
cd springMVC && mvn package
cd target && java -jar ./springMVC-0.0.1-SNAPSHOT.jar &
cd ../springEvilServer && mvn package
cd target && java -jar ./springEvilServer-0.0.1-SNAPSHOT.jar &
cd ../webdriverWithSelenium && mvn package
cd target && java -jar ./WebdriverWithSelenium-1.0-SNAPSHOT-jar-with-dependencies.jar User &
cd target && java -jar ./WebdriverWithSelenium-1.0-SNAPSHOT-jar-with-dependencies.jar Admin
echo "ENDE!"