package com.hackenanvms.springmvc.controller;

import com.hackenanvms.springmvc.commentSection.Comment;
import com.hackenanvms.springmvc.commentSection.CommentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/exhibits")
public class ExhibitController {

    private final CommentService commentService;

    public ExhibitController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping("")
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
    public String createComment(@ModelAttribute Comment newComment){
        this.commentService.addCommittedComment(newComment);
        return "redirect:/exhibits/marc_zuckerberg";
    }
}
