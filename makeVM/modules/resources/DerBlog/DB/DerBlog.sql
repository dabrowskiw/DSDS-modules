GRANT ALL ON *.* to 'autor'@'localhost' IDENTIFIED BY 'qDX7Fb3TvhVYgsSj' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE DATABASE der_blog;
use der_blog;

drop table if exists kommentare;
drop table if exists blogeinträge;
drop table if exists sessions;
drop table if exists user;
drop table if exists logindaten;

create table Logindaten
(
    Username VARCHAR(100) not null,
    Password VARCHAR(50) not null,
    UserID int auto_increment,
    IsAdmin boolean DEFAULT FALSE,
    constraint Logindaten_pk
        primary key (UserID)
);

create unique index Logindaten_Username_uindex
    on Logindaten (Username);

create table Blogeinträge
(
    BlogID int not null,
    constraint Blogeintrag_pk
        primary key (BlogID),
    Zeitstempel bigint not null,
    Titel VARCHAR(100) not null,
    Autor VARCHAR(50) not null,
    Inhalt VARCHAR(500) not null,
    UserID int not null,
    constraint UserID
        foreign key (UserID) references logindaten (UserID)
);


create table Kommentare
(
    BlogID int not null,
    constraint BlogID
        foreign key (BlogID) references Blogeinträge (BlogID),
    Zeitstempel bigint not null,
    Autor varchar(50) null,
    Inhalt varchar(500) null,
    UserID int not null,
    constraint UserID_kommentare
        foreign key (UserID) references logindaten (UserID)
);


create table Sessions
(
    UserID int not null,
    Zeitstempel bigint not null,
    constraint Sessions_pk
        primary key (UserID),
    constraint UserID_sessions
        foreign key (UserID) references logindaten (UserID)
);

create table User
(
    Username VARCHAR(100) not null,
    UserID int null,
    Vorname VARCHAR(100) DEFAULT '',
    Nachname VARCHAR(100) DEFAULT '',
    Geburtstag DATE DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR),
    Mailadresse VARCHAR(100) DEFAULT '',
    constraint User_pk
        primary key (UserID),
    constraint UserID_user
        foreign key (UserID) references logindaten (UserID)
);

create unique index User_Username_uindex
    on User (Username);

INSERT INTO logindaten values ('Ikke', '123456', 1, TRUE), ('Alpha', '1234567', 2, FALSE), ('Achim99', 'h=;LR]&HSzT|)AY', 3, FALSE), ('Harry', 'Z3JulyI989', 5, TRUE), ('Hermine', 'G^a~\k|_%y,z>54', 6, FALSE);

INSERT INTO user values ('Ikke', 1, 'Holger', 'Holstein', '1988-03-11', 'Ikke@gmail.sx'), ('Alpha', 2, 'Achronym', 'Mynorhca', '2011-11-11', 'Uff@gmail.bot'),
                        ('Achim99', 3, 'Achim', 'Kater', '2001-08-11', 'kater.achim@hotmail.com'), ('Harry', 5, 'Daniel', 'Radcliffe', '1989-7-23', 'RealPotter@gmail.hp'), ('Hermine', 6, 'Emma', 'Watson', '1990-04-15', 'RealRealGranger@gmail.nun');

INSERT INTO blogeinträge values (1, 1641815465, 'Sein', 'Ikke', 'Was ist unser sein?
        Welche Bedeutung hat es das wir leben?
        Sind wir nur, da zu da nur zu leben und zu sterben?', 1);

INSERT INTO blogeinträge values (2, 1641815465, 'Freude schöner Götterfunken', 'Ikke', 'Ist ein Pen and Paper das vom Donnerhaus vertrieben wird.
        März 2022 ist die erst Veröffentlichung und das zweite Werk von dem zweier Gespann nach Jannasaras Kartentasche.
        <a href = https://donnerhaus.eu >Donnerhaus</a>', 1);

INSERT INTO kommentare values (1, 1641815665, 'Achim99', 'Ist das sein alles was wir haben?', 3);
INSERT INTO kommentare values (1, 1641816605, 'Harry', 'Ist das Voldemort <br>
        oder ist das Apfelstrudel?', 5);
INSERT INTO kommentare values (2, 1642816605, 'Hermine', 'UUhhh von denen habe ich schon gehört. <br>
        Die sollen auch einen Discord haben und deren Videos mit den Froids sind auch ziemlich gut.', 6);