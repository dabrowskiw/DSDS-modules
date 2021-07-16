#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void fancyText();
void save2file();

int main()
{

    char figlet[] = "/usr/bin/figlet";
    char farewell[] = "Enjoy your stay!";
    char name[256];
    char telnum[32];
    char date[32];

    puts("================");;
    puts("|Hotel check in|");
    puts("================");

    puts("Please enter your data to proceed!");

    printf("Telephone number: ");
    gets(telnum);
    save2file(telnum);
    save2file("-");

    printf("Date until you leave: ");
    gets(date);
    save2file(date);
    save2file("-");

    printf("Your name: ");
    gets(name);
    save2file(name);
    save2file("\n");

    fancyText(figlet, farewell);


}

void fancyText(char fancyTextGenerator[], char fancyText[])
{
    char *arguments[] = {"fancyText", fancyText, NULL};
    execv(fancyTextGenerator, arguments);
}


void save2file(char text[]){
    FILE *f = fopen("checkin.data", "a");
    fputs(text, f);
    fclose(f);
}
