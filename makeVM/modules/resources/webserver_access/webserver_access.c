#include <stdio.h>
#include <string.h>
#include <pwd.h>


int main(int argc, char *argv[]) {
    char page[4096];
    FILE* pFile;

    pFile = fopen("/var/www/index.html","wb");
    printf("Enter new content for page:");
    fgets(page, 0x4096, stdin);
    fwrite(page, strlen(page) - 1, 1, pFile);
}


