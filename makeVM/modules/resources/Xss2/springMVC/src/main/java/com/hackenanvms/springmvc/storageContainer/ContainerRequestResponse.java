package com.hackenanvms.springmvc.storageContainer;

import java.util.UUID;

public class ContainerRequestResponse {

    private UUID respondedId;
    private String responseMessage;

    public ContainerRequestResponse(String respondedId, String responseMessage){
        this.respondedId = UUID.fromString(respondedId);
        this.responseMessage = responseMessage;
    }

    public UUID getRespondedId(){
        return this.respondedId;
    }

    public void setRespondedId(UUID respondedId){
        this.respondedId = respondedId;
    }

    public String getResponseMessage(){
        return this.responseMessage;
    }

    public void setResponseMessage(String responseMessage){
        this.responseMessage = responseMessage;
    }
}
