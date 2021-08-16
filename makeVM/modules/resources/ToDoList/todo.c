#include <stdio.h>
#include <stdbool.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

const char *todoName = "todo.txt";

void printTodos();
void addTodo();
void readLatestTodo();
void readOldestTodo();

const int maxToDoSize = 1024;

int main()
{

    const char *title =
        " ____            _            _           _   _____     ____        \n"
        "|  _ \\ _ __ ___ | |_ ___  ___| |_ ___  __| | |_   _|__ |  _ \\  ___  \n"
        "| |_) | '__/ _ \\| __/ _ \\/ __| __/ _ \\/ _` |   | |/ _ \\| | | |/ _ \\ \n"
        "|  __/| | | (_) | ||  __/ (__| ||  __/ (_| |   | | (_) | |_| | (_) |\n"
        "|_|   |_|  \\___/ \\__\\___|\\___|\\__\\___|\\__,_|   |_|\\___/|____/ \\___/ \n";

    const char *options =
        "[1] View all todos\n"
        "[2] View oldest todo\n"
        "[3] View latest todo\n"
        "[4] Add todo\n"
        "[5] Exit\n";

    puts(title);



    char input;

    do
    {
        puts(options);
        printf("Enter a number: ");
        scanf("%c", &input);
        getchar();

        printf("you've chosen #%c\n", input);
        switch (input)
        {
        case '1':
            printTodos();
            break;
        case '2':
            readOldestTodo();
            break;
        case '3':
            readLatestTodo();
            break;
        case '4':
            addTodo();
            break;
        case '5':
            puts("Exiting");
            break;
        default:
            puts("Invalid option!");
            break;
        }

    } while (input != '5');


    return 0;
}

void printTodos()
{
    char c;

    int fdList = open(todoName, O_RDONLY, NULL);

    if (fdList == -1)
    {
        puts("Could not open todo file!");
        exit(1);
    }

    printf("fd: %d\n", fdList);


    while (read(fdList, &c, 1) != 0)
    {

        printf("%c", c);
        fflush(stdout);
        usleep(50 * 1000);
    }


    close(fdList);
}

void addTodo()
{

    int fdList = open(todoName, O_WRONLY | O_APPEND, NULL);
    if (fdList == -1)
    {
        puts("Could not open todo file!");
        exit(1);
    }

    puts("enter todo: ");


    char *todo = NULL;
    unsigned int length = 0;
    int read;
    read = getline(&todo, &length, stdin);
    if (read == -1)
    {
        puts("could not read line");
        exit(1);
    }

    write(fdList, todo, read);

    close(fdList);
    free(todo);
}

void readLatestTodo()
{

    int fdList = open(todoName, O_RDONLY, NULL);

    if (fdList == -1)
    {
        puts("Could not open todo file!");
        exit(1);
    }

    FILE *f = fdopen(fdList, "r");

    char buffer[512];
    int counter = 0;
    while (fgets(buffer, maxToDoSize, f)) 
    {
        counter++;
    }
    
    if(counter > 0){
        printf("%s", buffer);
    }
    else
    {
        puts("No todo found");
    }

    close(fdList);
}

void readOldestTodo()
{

    int fdList = open(todoName, O_RDONLY, NULL);

    if (fdList == -1)
    {
        puts("Could not open todo file!");
        exit(1);
    }

    FILE *f = fdopen(fdList, "r");

    char buffer[512];
    if (fgets(buffer, maxToDoSize, f))
    {
        printf("%s", buffer);
    }
    else
    {
        puts("No todo found");
    }

    close(fdList);
}