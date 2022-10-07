package com.hackenanvms.springmvc.commentSection;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private List<Comment> commentList = new ArrayList<>();
    private List<Comment> committedCommentList = new ArrayList<>();

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
    public void addComment(Comment comment){
        this.commentList.add(comment);
    }

    public List<Comment> getCommittedCommentList(){
        return this.committedCommentList;
    }
    public void addCommittedComment(Comment comment){
        this.committedCommentList.add(comment);
    }
    public void deleteCommittedComment(UUID id){
        Comment comment = this.findCommittedCommentById(id);
        this.committedCommentList.remove(comment);
    }

    public void moveFromCommittedToPublicized(UUID commentID){
        Comment comment = this.findCommittedCommentById(commentID);
        boolean removed = this.committedCommentList.remove(comment);
        if(removed){
            this.commentList.add(comment);
        }
    }

    private Comment findCommittedCommentById(UUID id){
        for(Comment comment : this.committedCommentList){
            if(comment.getId().equals(id))return comment;
        }
        return null;
    }
}
