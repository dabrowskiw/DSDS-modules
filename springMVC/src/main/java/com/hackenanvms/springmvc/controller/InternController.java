package com.hackenanvms.springmvc.controller;

import com.hackenanvms.springmvc.commentSection.CommentService;
import com.hackenanvms.springmvc.storageContainer.Container;
import com.hackenanvms.springmvc.storageContainer.ContainerService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/intern")
public class InternController {

    private final CommentService commentService;
    private final ContainerService containerService;

    public InternController(CommentService commentService, ContainerService containerService){
        this.commentService = commentService;
        this.containerService = containerService;
    }

    @GetMapping("")
    public String intern(Model model){
        model.addAttribute("committedCommentList", this.commentService.getCommittedCommentList());
        return "intern";
    }

    @PostMapping("/delete_comment")
    public String deleteComment(@RequestParam UUID id){
        this.commentService.deleteCommittedComment(id);
        return "redirect:/intern";
    }

    @PostMapping("/publicize_comment")
    public String publicizeComment(@RequestParam UUID id){
        this.commentService.moveFromCommittedToPublicized(id);
        return "redirect:/intern";
    }


    @GetMapping("/storage")
    public String storage(Model model){
        List<Container> containerList = this.containerService.getContainerList();
        model.addAttribute("containerList", containerList);
        return "storageContainer";
    }

    @GetMapping("/storage/container")
    public String container(Model model, @RequestParam String id, @RequestParam String name){
        model.addAttribute("containerId", id);
        model.addAttribute("containerName", name);
        model.addAttribute("containerPassword", "");
        return "containerLogin";
    }

    @PostMapping("/storage/container")
    public String accessContainer(Model model, @RequestParam String id, @ModelAttribute(value = "containerPassword") String containerPassword){
        Container container = this.containerService.findContainerById(UUID.fromString(id));
        if(container.checkPassword(containerPassword)){
            model.addAttribute("container", container);
            return "concreteContainer";
        }
        return "redirect:/intern/storage/container?id="+id+"&name="+container.getContainerName()+"&error";
    }
}
