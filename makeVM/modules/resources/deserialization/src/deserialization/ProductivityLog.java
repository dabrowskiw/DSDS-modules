package deserialization;

import java.io.Serializable;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class ProductivityLog implements Serializable {
    private LocalDateTime timestamp;
    private String user;
    private int wordsPerMinute;

    public ProductivityLog(LocalDateTime timestamp, String user, int wordsPerMinute) {
        this.timestamp = timestamp;
        this.user = user;
        this.wordsPerMinute = wordsPerMinute;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public String getUser() {
        return this.user;
    }

    public int getWordsPerMinute() {
        return wordsPerMinute;
    }

    @Override
    public String toString() {
        return String.format("[%s] [%s] %d words per minute", this.timestamp.truncatedTo(ChronoUnit.MINUTES), this.user, this.wordsPerMinute);
    }
}
