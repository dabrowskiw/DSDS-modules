package com.hackenanvms.springmvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class SpringMvcApplication{

    public static void main(String[] args) {
        SpringApplication.run(SpringMvcApplication.class, args);
    }

}
