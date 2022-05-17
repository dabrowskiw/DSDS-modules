import React, { useState, useEffect } from "react";

import {NavLink} from 'react-router-dom';
import _ from "lodash";
import "../styles.css";
import { useNavigate } from "react-router";
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const List = (props) => {

  const BASE_URL = "http://localhost:3001";

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const path = window.location.pathname;

  useEffect(() => {

    // if (!props.logged) {
    //   navigate("/");
    // }

    let mounted = true;

    setTimeout(() => {
      async function getProducts() {
        fetch(`${BASE_URL}/products`, {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loading-screen">Loading products...</div>;
  } else {
    return (
              <div className="productList row justify-content-center mb-3">
                {!_.isEmpty(products) ? (
                  products.map(
                    (product) => {
                      return (
                        <div key={product.id} className="col-md-10 col-xl-10 mb-3">
                          <div className="shadow-0 border rounded-3 bg-light bg-gradient">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                  <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                    <img src="http://oh-eweedy.bplaced.net/Bilder/funaSmall.JPG" className="w-100" />
                                    <a href="#!">
                                      <div className="hover-overlay">
                                        <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-6">
                                  <h5 className="text-center">{product.name}</h5>
                                  <p className="text-right">Sterne</p>
                                  <p className="truncate-overflow mb-4 mb-md-0">
                                    {product.description}
                                  </p>
                                </div>
                                <div className="col-md-4 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                  <div className="d-flex flex-row align-items-center mb-1">
                                    <h4 className="mb-1 me-1">${product.price}</h4>
                                    <h6 className="text-success">{product.amount} in stock</h6>
                                  </div>
                                  <div className="d-flex flex-column mt-4">
                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate(`/detailPage/${product.id}`)}>
                                      Details
                                    </button>
                                    <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                                      Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                ) : (
                  <p className="message">Empty. No Products available.</p>
                )}
              </div>
           
         
    );
  };
};

export default List;