package com.example.springevilserver;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CookieService {

    private List<String> cookieList = new ArrayList<>();

    public void add(String cookieString){
        this.cookieList.add(cookieString);
    }

    public String toString(){
        String cookieListString = "<h4>Cookies received:</h4><br>";
        for(String cookie : cookieList){
            cookieListString = cookieListString + cookie + "<br>";
        }
        return cookieListString;
    }
}
