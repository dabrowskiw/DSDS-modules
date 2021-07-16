#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <stdbool.h>
#include <string.h>

void printBookName();
void editList();
void printAmountOfBooks();
const char *isbnPrefix = "ISBN:";
int main()
{

    puts("Library");

    char input;
    do
    {
        puts("[b] Get book by isbn");
        puts("[a] Get amount of books");
        // puts("[e] Edit book list"); This binary is only for customers and not staff
        puts("[q] Quit");

        printf("Enter an option: ");
        scanf("%c", &input);
        getchar();

        switch (input)
        {
        case 'b':
            printBookName();
            break;
        case 'a':
            printAmountOfBooks();
            break;
            /*
        case 'e': // This binary is only for customers and not staff
            editList();
            break;
            */
        case 'q':
            puts("Quitting...");
        default:
            break;
        }

    } while (input != 'q');
}

void printBookName()
{
    char isbn[14];
    bool foundIsbn = false;
    char textBuffer[32];

    puts("Enter isbn:");
    gets(isbn);

    FILE *f = fopen("books.data", "r");

    int counter = 0;
    char buffer[512];
    while (fgets(buffer, 512, f))
    {

        snprintf(textBuffer, sizeof(textBuffer), "%s%s", isbnPrefix, isbn);
        if(strncmp(textBuffer, buffer, strlen(textBuffer)) == 0){
            foundIsbn = true;
            break;
        }
     
        
    }
    if(foundIsbn && fgets(buffer, 512, f)){
        printf("Found book: %s\n", buffer);
    }

    

    fclose(f);
}

void editList()
{
    char *arguments[] = {"BookListEditorMode", "-p", NULL};
    execv("/bin/sh", arguments);
}

void printAmountOfBooks()
{

    FILE *f = fopen("books.data", "r");

    int counter = 0;
    char buffer[512];
    while (fgets(buffer, 512, f))
    {
        counter++;
    }

    printf("The library has %d available books!\n", counter / 2);

    fclose(f);
}