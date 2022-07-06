package com.hackenanvms.springmvc.storageContainer;

import java.util.UUID;

public class ContainerRequest {

    private UUID requestId = UUID.randomUUID();
    private String ownerName;
    private String requestMessage;
    private ContainerRequestResponse response = null;

    public ContainerRequest(String requestMessage){
        this.requestMessage = requestMessage;
    }

    public UUID getRequestId() {
        return requestId;
    }

    public String getOwnerName(){
        return this.ownerName;
    }

    public void setOwnerName(String ownerName){
        this.ownerName = ownerName;
    }

    public String getRequestMessage() {
        return requestMessage;
    }

    public void setRequestMessage(String requestMessage){
        this.requestMessage = requestMessage;
    }

    public ContainerRequestResponse getResponse() {
        return response;
    }

    public void setResponse(ContainerRequestResponse response) {
        this.response = response;
    }
}
