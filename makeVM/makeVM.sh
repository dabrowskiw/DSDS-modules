#!/bin/bash

export TMPDIR=temp/
export RESOURCEDIR=modules/resources/
export ENVFILE=${TMPDIR}/env.sh
export VMNAME="HTW-Injectable-new"
export STARTSNAPSHOT="CleanInstall"
#export STARTSNAPSHOT="SSH-LEMP"

rm -f ${ENVFILE}

vboxmanage controlvm ${VMNAME} poweroff
vboxmanage snapshot ${VMNAME} restore ${STARTSNAPSHOT}
vboxmanage controlvm ${VMNAME} acpipowerbutton
sleep 2

for module in `cat modules.txt | grep -v "#"`; do
  echo "Running module ${module}..."
  modules/${module}
  sleep 10
  vboxmanage controlvm ${VMNAME} acpipowerbutton
  sleep 10
  vboxmanage controlvm ${VMNAME} poweroff
  sleep 2
done
