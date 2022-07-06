package com.hackenanvms.springmvc.storageContainer;

import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class ContainerRequestService {

    List<ContainerRequest> requestList = new ArrayList<>();

    public List<ContainerRequest> getRequestList() {
        return this.requestList;
    }

    public void addRequest(String requestMessage, String requestOwner){
        try{
            URL url = new URL(requestMessage);
            ContainerRequest request = new ContainerRequest(requestMessage);
            request.setOwnerName(requestOwner);
            this.requestList.add(request);
        } catch (MalformedURLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void addResponseToRequest(ContainerRequestResponse requestResponse){
        if(!requestResponse.getResponseMessage().equals("")){
            for(ContainerRequest request : this.requestList){
                if(request.getRequestId().equals(requestResponse.getRespondedId())){
                    request.setResponse(requestResponse);
                }
            }
        }
    }
}

