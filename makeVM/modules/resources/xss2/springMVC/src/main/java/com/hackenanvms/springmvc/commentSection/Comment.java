package com.hackenanvms.springmvc.commentSection;

import java.util.Date;
import java.util.UUID;

public class Comment {

    private UUID id = UUID.randomUUID();
    private String creatorName = "Anonymous";
    private String commentMsg;
    private String creationDate = new Date().toString();

    public Comment(){
        this.commentMsg = "";
    }

    public Comment(String commentMsg){
        this.commentMsg = commentMsg;
    }

    public Comment(String creatorName, String commentMsg){
        this.creatorName = creatorName;
        this.commentMsg = commentMsg;
    }

    public UUID getId(){
        return this.id;
    }

    public String getCommentMsg() {
        return this.commentMsg;
    }

    public void setCommentMsg(String commentMsg){
        this.commentMsg = commentMsg;
    }

    public String getCreationDate(){
        return this.creationDate;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }
}
