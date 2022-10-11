#!/bin/bash
LIB=lib/commons-collections-3.1.jar
DEFAULT_USER=johndoe@gmail.com
DEFAULT_PASSWORD=u372hn8fj128j
APP_PORT=8124

cd /home/mario/deserialization

LOCAL_HOST_IP=$(<local_ip)

while true; do
    java -cp ${LIB}:./out deserialization.Server 0.0.0.0 ${APP_PORT} ${DEFAULT_USER} ${DEFAULT_PASSWORD}
done &

while true; do
    java -cp ./out deserialization.Client ${LOCAL_HOST_IP} ${APP_PORT} ${DEFAULT_USER} ${DEFAULT_PASSWORD}
    sleep 3
done
