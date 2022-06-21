package com.hackenanvms.springmvc.controller;

import com.hackenanvms.springmvc.commentSection.Comment;
import com.hackenanvms.springmvc.commentSection.CommentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {

    private final CommentService commentService;

    public MainController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("/exhibits")
    public String exhibits(){
        return "exhibits";
    }

    @GetMapping("/john_von_neumann")
    public String johnVonNeumann(){
        return "johnVonNeumann";
    }

    @GetMapping("/noam_chomsky")
    public String noamChomsky(){
        return "noamChomsky";
    }

    @GetMapping("/steve_jobs")
    public String steveJobs(){
        return "steveJobs";
    }

    @GetMapping("/marc_zuckerberg")
    public String marcZuckerberg(Model model){
        model.addAttribute("commentList", commentService.getCommentList());
        model.addAttribute("newComment", new Comment());
        return "marcZuckerberg";
    }

    @PostMapping("/marc_zuckerberg_new_comment")
    public String createComment(Model model, @ModelAttribute Comment newComment){
        this.commentService.addComment(newComment);
        model.addAttribute("commentList", commentService.getCommentList());
        return "redirect:/marc_zuckerberg";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/intern")
    public String intern(){
        return "intern";
    }

    @GetMapping("/contact")
    public String contact(){
        return "contact";
    }
}
