import React, { useState, useEffect } from "react";
import _ from "lodash";
import "../styles.css";
import { useNavigate, useParams } from "react-router";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../structure/Header"
import Footer from "../structure/Footer"

const Detail = (props) => {

  const BASE_URL = "http://localhost:3001";

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const path = window.location.pathname;

  const { id } = useParams(); //gets id from current route

  const productToFind = products.find((product) => product.id === id);

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      async function getProducts() {
        fetch(`${BASE_URL}/products/`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              if (mounted) {
                setIsLoaded(true);
                setProducts(result);
              }
            },
            (error) => {
              if (mounted) {
                setIsLoaded(true);
                setError(error);
              }
            }
          );
      } getProducts();
    }, 2000);
    return () => (mounted = false); //cleanup function
  }, [products, BASE_URL, navigate, path, props.logged]);

  const logout = () => {
    props.onLogout();
  };

  return (<div>
    <div className="container">
      <Header />
      <main>
        {error ? (<div>Error: {error.message}</div>) :
          (!isLoaded ? (<div className="loading-screen">Loading product...</div>) :
            ((!_.isEmpty(products)) ? (
              <>
                <div className="productList row justify-content-center mb-3">
                  <div className="col-md-10 col-xl-10 mb-3"></div>
                  <div className="shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6  mb-4 mb-lg-0">
                          <div className="bg-image hover-zoom ripple rounded ripple-surface">
                            <img src="http://oh-eweedy.bplaced.net/Bilder/funaSmall.JPG" className="w-100" />
                            <a href="#!">
                              <div className="hover-overlay">
                                <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xl-6">
                          <h5 className="text-center">{productToFind.name}</h5>
                          <p className="text-right">Sterne</p>
                          <p className="mb-4 mb-md-0">
                            {productToFind.description}
                          </p>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">${productToFind.price}</h4>
                            <h6 className="text-success">{productToFind.amount} in stock</h6>
                          </div>
                          <div className="d-flex flex-column mt-4">
                            <button className="  btn btn-outline-primary btn-sm mt-2" type="button">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* comment section  */}
                  <div className="col-md-10 col-xl-10 mb-3"></div>
                  <div className="shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        {productToFind.comments.map(
                          (comment) => {
                            return (
                              <div className="shadow-0 border rounded-3 mb-3">
                                {/* <h5 className="text-center">userName</h5>
                                <p className="text-right">date</p> */}
                                <p className="mb-4 mb-md-0">
                                  {comment}
                                </p>
                              </div>
                            )
                          })}
                        {/* comment input field  */}
                        <form class="form-inline">
                          <div className="col-12 rounded-3 input-group">
                            <textarea type="text" className="form-control" id="comment" placeholder="Your Comment" />
                            <div className="col-auto input-group-append">
                              <button type="submit" className="notRelativ btn btn-primary">Add Comment</button>
                            </div>
                          </div>
                        </form>
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
