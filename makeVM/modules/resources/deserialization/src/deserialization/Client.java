package deserialization;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.concurrent.ThreadLocalRandom;
import java.time.LocalDateTime;

public class Client {

    public static void main(String[] arg) throws IOException {
        String serverIp = arg[0];
        int port = Integer.parseInt(arg[1]);
        String defaultUser = arg[2];
        String defaultPassword = arg[3];

        try {
            Socket socket = new Socket(serverIp, port);
            var inputReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            var outputWriter = new PrintWriter(socket.getOutputStream(), true);

            outputWriter.println(defaultUser);
            String res = inputReader.readLine();
            if (!res.equals("OK"))
                throw new RuntimeException("Could not authenticate: " + res);

            outputWriter.println(defaultPassword);
            res = inputReader.readLine();
            if (!res.equals("OK"))
                throw new RuntimeException("Could not authenticate: " + res);

            var clientOutputStream = new ObjectOutputStream(socket.getOutputStream());
            ProductivityLog msg = new ProductivityLog(
                    LocalDateTime.now(), defaultUser, ThreadLocalRandom.current().nextInt(0, 51));
            clientOutputStream.writeObject(msg);
            clientOutputStream.flush();

            res = inputReader.readLine();
            System.out.println(res.toString());

            clientOutputStream.close();
            inputReader.close();
            outputWriter.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
