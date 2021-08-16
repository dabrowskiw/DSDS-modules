# Install necessary program
apt-get install figlet -y

# Compile hotel check in program and set suid bit
gcc main.c -m32 -fno-stack-protector -o CheckIn && chmod u+s CheckIn
