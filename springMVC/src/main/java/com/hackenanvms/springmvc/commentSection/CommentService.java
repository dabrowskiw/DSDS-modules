package com.hackenanvms.springmvc.commentSection;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private List<Comment> commentList = new ArrayList<>();

    public CommentService(){
        Comment comment1 = new Comment("This is the First Comment");// <body onload=alert(/XSS/.source)>
        Comment comment2 = new Comment("This is the Second Comment");
        Comment comment3 = new Comment("This is the 3 Comment");
        this.addComment(comment1);
        this.addComment(comment2);
        this.addComment(comment3);
    }

    public List<Comment> getCommentList() {
        return this.commentList;
    }
    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    public void addComment(Comment newComment){
        this.commentList.add(newComment);
    }
}
