package com.hackenanvms.springmvc.controller;

import com.hackenanvms.springmvc.commentSection.CommentService;
import com.hackenanvms.springmvc.storageContainer.*;
import org.springframework.security.core.Authentication;
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
    private final ContainerRequestService containerRequestService;


    public InternController(CommentService commentService,
                            ContainerService containerService,
                            ContainerRequestService containerRequestService){
        this.commentService = commentService;
        this.containerService = containerService;
        this.containerRequestService = containerRequestService;
    }

    @GetMapping("")
    public String intern(Model model){
        return "intern";
    }

    @GetMapping("/commentReview")
    public String commentReview(Model model){
        model.addAttribute("committedCommentList", this.commentService.getCommittedCommentList());
        return "commentReview";
    }

    @PostMapping("/commentReview/delete_comment")
    public String deleteComment(@RequestParam UUID id){
        this.commentService.deleteCommittedComment(id);
        return "redirect:/intern/commentReview";
    }

    @PostMapping("/commentReview/publicize_comment")
    public String publicizeComment(@RequestParam UUID id){
        this.commentService.moveFromCommittedToPublicized(id);
        return "redirect:/intern/commentReview";
    }


    @GetMapping("/storage")
    public String storage(Model model){
        List<Container> containerList = this.containerService.getContainerList();
        model.addAttribute("containerList", containerList);
        return "storageContainer";
    }

    @GetMapping("/storage/container")
    public String container(Model model, @RequestParam String id, @RequestParam String name){
        try{
            UUID containerID = UUID.fromString(id);
            if(containerService.findContainerById(containerID)!= null){
                model.addAttribute("containerId", id);
                model.addAttribute("containerName", name);
                model.addAttribute("containerPassword", "");
                return "containerLogin";
            }
        }catch (IllegalArgumentException e){
            e.printStackTrace();
        }
        return "redirect:/intern/storage";
    }

    @PostMapping("/storage/container")
    public String accessContainer(Model model, @RequestParam String id, @ModelAttribute(value = "containerPassword") String containerPassword){
        Container container = this.containerService.findContainerById(UUID.fromString(id));
        if(container.checkPassword(containerPassword)){
            model.addAttribute("container", container);
            return "concreteContainer";
        }
        return "redirect:/intern/storage/container?error&id="+id+"&name="+container.getContainerName();
    }

    @GetMapping("/storage/container_forum")
    public String containerForum(Model model){
        model.addAttribute("requestList", containerRequestService.getRequestList());
        model.addAttribute("newRequest", new ContainerRequest(""));
        model.addAttribute("newResponse", new ContainerRequestResponse(UUID.randomUUID().toString(),""));
        return "containerForum";
    }

    @PostMapping("/storage/container_forum_new_request")
    public String addContainerRequest(@ModelAttribute ContainerRequest newRequest, Authentication authentication){
        this.containerRequestService.addRequest(newRequest.getRequestMessage(), authentication.getName());
        return "redirect:/intern/storage/container_forum";
    }

    @PostMapping("/storage/container_forum_new_response")
    public String addContainerRequest(@ModelAttribute ContainerRequestResponse newResponse){
        this.containerRequestService.addResponseToRequest(newResponse);
        return "redirect:/intern/storage/container_forum";
    }
}
