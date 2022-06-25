package com.hackenanvms.springmvc.storageContainer;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ContainerService {

    private List<Container> containerList = new ArrayList<>();

    public ContainerService(){
        this.containerList.add(new Container("container1", "News Container","Employee#1","Content"));
        this.containerList.add(new Container("container2", "Noam Container","Employee#2","Content"));
        this.containerList.add(new Container("container3", "Neum. Container","Employee#3","Content"));
        this.containerList.add(new Container("container4", " Container","Employee#2","Content"));
        this.containerList.add(new Container("container5", "VIP Container","Director","Content"));
    }

    public Container findContainerById(UUID containerId){
        for (Container container : containerList){
            if(container.getContainerId().equals(containerId))return container;
        }
        return null;
    }

    public List<Container> getContainerList() {
        return this.containerList;
    }
}
