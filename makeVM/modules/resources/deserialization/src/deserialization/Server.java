package deserialization;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.io.EOFException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Optional;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.InetAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import org.apache.commons.collections.buffer.CircularFifoBuffer;

public class Server {
    private static CircularFifoBuffer logBuffer = new CircularFifoBuffer(20);

    enum CommunicationState {
        START, USER_SUPPLIED, AUTH_SUCCESS, END
    };

    static class Handler implements HttpHandler {
        public void handle(HttpExchange t) throws IOException {
        String head =
"<meta http-equiv='Refresh' content='1'>" +
"<pre>" +
"  ____                _            _   _       _ _         __  __             _ _             _             \n" +
" |  _ \\ _ __ ___   __| |_   _  ___| |_(_)_   _(_) |_ _   _|  \\/  | ___  _ __ (_) |_ ___  _ __(_)_ __   __ _ \n" +
" | |_) | '__/ _ \\ / _` | | | |/ __| __| \\ \\ / / | __| | | | |\\/| |/ _ \\| '_ \\| | __/ _ \\| '__| | '_ \\ / _` |\n" +
" |  __/| | | (_) | (_| | |_| | (__| |_| |\\ V /| | |_| |_| | |  | | (_) | | | | | || (_) | |  | | | | | (_| |\n" +
" |_|   |_|  \\___/ \\__,_|\\__,_|\\___|\\__|_| \\_/ |_|\\__|\\__, |_|  |_|\\___/|_| |_|_|\\__\\___/|_|  |_|_| |_|\\__, |\n" +
"                                                     |___/                                            |___/ \n" +
"                                                                                                            \n" +
"                                                                                                            \n";
        byte [] response = (head + String.join("\n", logBuffer) + "</pre>").getBytes();
        t.sendResponseHeaders(200, response.length);
        OutputStream os = t.getResponseBody();
        os.write(response);
        os.close();
        }
    }

    public static void main(String[] arg) {
        try {
            InetAddress bindAddr = InetAddress.getByName(arg[0]);
            int port = Integer.parseInt(arg[1]);
            String defaultUser = arg[2];
            String defaultPassword = arg[3];

            HttpServer server = HttpServer.create(new InetSocketAddress(8123), 0);
            server.createContext("/", new Handler());
            server.setExecutor(null);
            server.start();

            ServerSocket socketConnection = new ServerSocket(port, 10, bindAddr);

            while (true) {
                Socket socket = socketConnection.accept();

                Thread connectionHandler = new Thread(() -> {
                    CommunicationState state = CommunicationState.START;

                    try {
                        System.out.println("New connection from " + socket.getInetAddress());

                        Optional<ObjectInputStream> objectInputStream = Optional.empty();
                        var inputReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                        var outputWriter = new PrintWriter(socket.getOutputStream(), true);

                        while (state != CommunicationState.END) {
                            switch (state) {
                                case START:
                                    String username = inputReader.readLine();
                                    if (username.equals(defaultUser)) {
                                        state = CommunicationState.USER_SUPPLIED;
                                        outputWriter.println("OK");
                                    } else {
                                        state = CommunicationState.END;
                                        outputWriter.println("USER_NOT_VALID");
                                    }
                                    break;
                                case USER_SUPPLIED:
                                    String password = inputReader.readLine();
                                    if (password.equals(defaultPassword)) {
                                        state = CommunicationState.AUTH_SUCCESS;
                                        outputWriter.println("OK");
                                        objectInputStream = Optional.of(new ObjectInputStream(socket.getInputStream()));
                                        System.out.println("Client authenticated successfully");
                                    } else {
                                        state = CommunicationState.END;
                                        outputWriter.println("PASSWORD_NOT_CORRECT");
                                        System.out.println("Client supplied wrong password");
                                    }
                                    break;
                                case AUTH_SUCCESS:
                                    if (objectInputStream.isPresent()) {
                                        try {
                                            ProductivityLog logEntry = (ProductivityLog) objectInputStream.get()
                                                    .readObject();
                                            System.out.println(logEntry);
                                            logBuffer.add(socket.getInetAddress() + ":" + port + " " + logEntry.toString());
                                            outputWriter.println("OK");
                                        } catch (EOFException e) {
                                            state = CommunicationState.END;
                                        } catch (Exception e) {
                                            outputWriter.println(e);
                                            logBuffer.add(e.getMessage());
                                            throw new RuntimeException(e);
                                        }
                                    }
                                    break;
                                case END:
                                    break;
                            }

                        }

                        System.out.println("Closing connection from " + socket.getInetAddress());
                        if (objectInputStream.isPresent()) {
                            objectInputStream.get().close();
                        }
                        inputReader.close();
                        outputWriter.close();
                        socket.close();
                    } catch (IOException e) {
                        System.out.println(e);
                    }
                });

                connectionHandler.start();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
