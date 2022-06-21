import React, { useState, useEffect } from "react";
import _ from "lodash";
import "../styles.css";
import { useNavigate, useParams } from "react-router";

import * as Icon from 'react-bootstrap-icons';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../structure/Header"
import Footer from "../structure/Footer"

const Detail = (props) => {

  const BASE_URL = props.baseUrl;

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const [product, setProduct] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();

  const path = window.location.pathname;
  const { id } = useParams(); //gets id from current route

  const addCommentButtonHandler = () => {
    var tableData = {
      author: loggedUser,
      text: newComment,
      product_id: id
    };

    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Sicherheitsvorkehrung: Strict-Transport-Security: max-age=31536000; includeSubDomains
      body: JSON.stringify(tableData),
    };
    fetch(`${BASE_URL}/comments/`, requestOptions)
  };

  const addCommentTextFieldChangeHandler = (e) => {
    const enteredComment = e.target.value;
    setNewComment(enteredComment);
  }

  const likeButtonHandler = () => {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Sicherheitsvorkehrung: Strict-Transport-Security: max-age=31536000; includeSubDomains
    };
    fetch(`${BASE_URL}/products/${id}/like`, requestOptions)
  };

  const addToCartButtonHandler = () => {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Sicherheitsvorkehrung: Strict-Transport-Security: max-age=31536000; includeSubDomains
    };
    fetch(`${BASE_URL}/profile/${loggedUser.id}/cart`, requestOptions)
  };

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      async function getProduct() {
        fetch(`${BASE_URL}/products/${id}`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (mounted) {
                setIsLoaded(true);
                setProduct(result);
              }
            },
            (error) => {
              if (mounted) {
                setIsLoaded(true);
                setError(error);
              }
            }
          );
      } getProduct();

      async function getProductComments() {
        fetch(`${BASE_URL}/comments/${id}`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (mounted) {
                setIsLoadedComments(true);
                setComments(result);
              }
            },
            (error) => {
              if (mounted) {
                setIsLoadedComments(true);
                setError(error);
              }
            }
          );
      } getProductComments();
      
      async function getLoggedUser(){
        fetch(`${BASE_URL}/users`,{
          method: "GET",
          credentials: "include",
        }).then((res) => res.json())
        .then(
          (result) => {
            if(mounted){
              setLoggedUser(result.username);
            }
          },(error) => {
            if(mounted){
              setError(error);
            }
          }
        )
      }  getLoggedUser();
    }, 2000);

    return () => (mounted = false); //cleanup function
  }, [product, BASE_URL, navigate, path, props.logged, id, comments]);

  const logout = () => {
    props.onLogout();
  };

  return (<div>
    <div className="container">
      <Header loggedIn={props.loggedIn}
        user={props.user}
        onLogout={logout} />
      <main>
        {error ? (<div>Error: {error.message}</div>) :
          (!isLoaded ? (<div className="loading-screen">Loading product...</div>) :
            ((!_.isEmpty(product)) ? (
              <>
                <div className="productList row justify-content-center mb-3">
                  <div className="col-md-10 col-xl-10 mb-3"></div>
                  <div className="shadow-0 border rounded-3 bg-light bg-gradient">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6  ">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src={window.location.origin + "/img/" + product.img} className="w-100" alt={product.img} />
                            <a href="#!">
                              <div className="hover-overlay">
                                <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-6">
                          <h5 className="text-center">{product.name}</h5>
                          <p className="text-right"><span>{product.likes}</span> Likes | <span>{comments.length}</span> Comments</p>
                          <p className="mb-4 mb-md-0">
                            {product.description}
                          </p>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-mb-start-0 border-start">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">${product.price}</h4>
                            <h6 className="text-success">{product.amount} in stock</h6>
                          </div>
                          <div className="d-flex flex-row mt-4">
                            <button className="btn btn-outline-primary btn-md mx-2" type="button" onClick={likeButtonHandler}>
                              Like
                            </button>
                            <button className="btn btn-primary btn-md" type="button"
                              onClick={addToCartButtonHandler}>
                              Add to Cart <Icon.Cart />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* comment section  */}


                  <div className="shadow-0 border bg-light bg-gradient rounded-3 mt-3">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        {!isLoadedComments ? (<div className="loading-screen">Loading comments...<br/></div>) :
                          ((!_.isEmpty(comments)) ? (
                            comments.map(
                              (comment) => {
                                return (
                                  <div key={comment.comment_id} className="row bg-white shadow-0 border rounded-3 mb-3 pt-1">
                                    <div className="col-9 ">
                                      <p>{comment.text}</p>
                                    </div>
                                    <div className="col-3 mb-0 text-right blockquote-footer">
                                      <p>{comment.created_at} by {comment.author}</p>
                                    </div></div>
                                )
                              })
                          ) : (<p className="message">Be the first to comment.</p>)
                          )}

                        {/* comment input field  */}
                        {props.loggedIn ?
                          <form className="form-inline">
                            <div className="col-12 rounded-3 input-group">
                              <textarea type="text" className="form-control" htmlFor="comment" id="comment" placeholder="Your Comment" onChange={addCommentTextFieldChangeHandler}/>
                              <div className="col-auto input-group-append">
                                <button type="button" className="notRelativ btn btn-primary" onClick={addCommentButtonHandler}>Add Comment</button>
                              </div>
                            </div>
                          </form>
                          :
                          <form className="form-inline">
                            <div className="col-12 rounded-3 input-group">
                              <textarea disabled type="text" className="form-control" id="comment" placeholder="Please log in to leave a comment!" />
                              <div className="col-auto input-group-append">
                                <button type="button" className="notRelativ btn btn-secondary disabled">Add Comment</button>
                              </div>
                            </div>
                          </form>

                        }
                      </div>
                    </div>
                  </div>


                </div>
              </>
            ) : (
              <p className="message">Empty. No Product available.</p>
            )
            ))}
      </main>
    </div>
    <div>
      <Footer />
    </div>
  </div >
  );
};
export default Detail;
