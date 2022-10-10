Story:  
Auf dem Server liegt ein SUID binary, was den Zugriff auf /var/www/index.html für normale user erlaubt.
Somit muss das ganze directory nicht freigeschaltet werden.

Schwachstelle:  
Das binary hat eine buffer overflow Schachstelle.
Für den exploit muss mit gdb gearbeitet werden.
Man gibt dummy data ein, wie AAAA.
Man setzt einen breakpoint nach dem read.
Man schaut sich den stack an über x/2000wx $esp
Dort, wo die 0x41414141 auftauchen, beginnt der buffer.
Durch trial and error lässt sich die Position des return pointers ermitteln.
Die payload setzt sich aus einer NOP-slide, einem shellcode, einem filler für den buffer, eine Reihe von festen Adressen, die vom stack ausgelesen werden müsssen, bis zur return adresse zusammen.
An Stelle der return adresse kommt die Adresse des Buffers plus die Hälfte der Länge der NOP slide.
Die payload wird lokal mithilfe von pwntools erstellt.

Leider gab es ein Problem, welches nicht gelöst werden konnte.
/bin/dash wird ausgeführt, aber danach kommt trotzdem ein SegFault.
Nachprüfbar mit:
gdb a.out
disassemble main
b* 0x08049248
r < web_payload.txt
c

