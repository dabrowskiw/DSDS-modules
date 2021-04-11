#!/bin/bash

export TMPDIR=temp/
export RESOURCEDIR=modules/resources/
export ENVFILE=${TMPDIR}/env.sh
export VMNAME="HTW-Injectable"
#export STARTSNAPSHOT="CleanInstall"
export STARTSNAPSHOT="SSH-LEMP"

rm -f ${ENVFILE}

vboxmanage controlvm ${VMNAME} poweroff
vboxmanage snapshot ${VMNAME} restore ${STARTSNAPSHOT}
vboxmanage controlvm ${VMNAME} acpipowerbutton
sleep 2

for module in `cat modules.txt | grep -v "#"`; do
  echo "Running module ${module}..."
  modules/${module}
  vboxmanage controlvm ${VMNAME} acpipowerbutton
  sleep 2
done
