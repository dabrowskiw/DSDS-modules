#!/bin/bash
APP_DIR=/home/mario/deserialization
LOCAL_IP=$(hostname -I | cut -f1 -d' ')

vboxmanage modifyvm "HTW-Injectable" --natpf1 "deserialization_web,tcp,,8123,,8123"
vboxmanage modifyvm "HTW-Injectable" --natpf1 "deserialization_comm,tcp,,8124,,8124"
vboxmanage startvm "HTW-Injectable" --type headless
echo "Waiting for VM to come up..."
sleep 8

scp -P 2200 -i ${TMPDIR}/rootkey -r modules/resources/deserialization root@127.0.0.1:/home/mario/
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "apt-get update && apt-get install -y default-jdk"
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "echo '@reboot mario ${APP_DIR}/run.sh' > /etc/cron.d/deserialization"
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "mkdir -p ${APP_DIR}/out && \
    javac -cp ${APP_DIR}/lib/commons-collections-3.1.jar -d ${APP_DIR}/out ${APP_DIR}/src/deserialization/*.java"
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "cd ${APP_DIR} && echo ${LOCAL_IP} > ./local_ip && chmod +x run.sh"
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "chown -R mario:mario ${APP_DIR}"
ssh -p 2200 -i ${TMPDIR}/rootkey root@127.0.0.1 "su mario -c ${APP_DIR}/run.sh"
