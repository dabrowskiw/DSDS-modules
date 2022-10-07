package com.hackenanvms.springmvc.storageContainer;

import java.util.UUID;

public class Container {

    private final UUID containerId;
    private final String containerPassword;
    private final String containerName;
    private final String containerOwner;
    private final String content;

    public Container(String containerId, String containerPassword, String containerName, String containerOwner, String content){
        this.containerId = UUID.fromString(containerId);
        this.containerPassword = containerPassword;
        this.containerName = containerName;
        this.containerOwner = containerOwner;
        this.content = content;
    }

    public UUID getContainerId() {
        return this.containerId;
    }

    public boolean checkPassword(String containerPassword) {
        return this.containerPassword.equals(containerPassword);
    }

    public String getContainerName(){
        return this.containerName;
    }

    public String getContainerOwner(){
        return this.containerOwner;
    }

    public String getContent() {
        return this.content;
    }
}
