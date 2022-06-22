package com.hackenanvms.springmvc.filter;

import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SessionFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        this.removeHttpOnlyFlag(res);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void removeHttpOnlyFlag(HttpServletResponse res) {
        String setCookieHeaderName = "set-cookie";
        String setCookieHeader = res.getHeader(setCookieHeaderName);
        if(setCookieHeader != null){
            setCookieHeader = setCookieHeader.replace("; HttpOnly","");
            res.setHeader(setCookieHeaderName, setCookieHeader);
        }
    }
}
