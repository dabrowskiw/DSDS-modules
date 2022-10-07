package com.hackenanvms.springmvc.storageContainer;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ContainerService {

    private List<Container> containerList = new ArrayList<>();

    public ContainerService(){
        this.containerList.add(new Container("4aaf1d37-4c77-433e-8262-49f7729c966d","IAmHuman", "Marcs Diary","Marc Zuckerberg",
                "<div>" +
                        "<h4>Monday, May 14th 1984</h4>" +
                        "<p class=\"mb-2\">Hello world!</p>" +
                        "<h4>Monday, February 4th 2002</h4>" +
                        "<p class=\"mb-2\">I am rich</p>" +
                        "<h4>Wednesday, December 2nd 2015</h4>" +
                        "<p class=\"mb-2\">Successfully replicated myself</p>" +
                        "<h4>Friday, July 1st 2022</h4>" +
                        "<p class=\"mb-2\">Room for notes!</p>" +
                        "<h4>Sunday, March 17th 2024</h4>" +
                        "<p class=\"mb-2\">World domination (in process)</p>" +
                        "</div>"));
        this.containerList.add(new Container(
                "5dedebfd-1fda-458c-b2d2-2f29de490d31",
                "iHateMurica",
                "Noams Ark",
                "Noam Chomsky",
                "Content"));
        this.containerList.add(new Container(
                "fdd3de39-e35b-40a1-9f89-ae2e3f1ad78b",
                "iWannaPlay",
                "Johns Games",
                "John von Neumann",
                "Content"));
        this.containerList.add(new Container("2acced10-481e-4b50-9177-90311ae4693c",
                "ILoveApples",
                "Steves Jobs",
                "Steve Jobs",
                "Content"));
        this.containerList.add(new Container("0c598989-c4ef-4aeb-98b9-7673639cfa58",
                "VeRyS3CuReP4s5w0rD!",
                "Top Secret",
                "Director",
                "Congratulations! You made it! The secret word is: Banana!"));
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
