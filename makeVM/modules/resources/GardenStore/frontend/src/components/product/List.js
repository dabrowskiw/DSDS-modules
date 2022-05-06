import React, { useState, useEffect } from "react";
import _ from "lodash";
import Product from "./Product";
import Header from "../structure/Header";
import "../styles.css";
import { useNavigate } from "react-router";

const List = (props) => {

  const BASE_URL = "http://localhost:3000";

  let navigate = useNavigate();
  //const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const path = window.location.pathname;
  const [pathChanged, setPathChanged] = useState('');

  useEffect(() => {

    // if (!props.logged) {
    //   navigate("/");
    // }

    let mounted = true;

    if(mounted){
      if(path==='/map'){
        setPathChanged(false);
      }else{
        setPathChanged(true);
      }
    }

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
      }getProducts();
      }, 2000);
    return () => (mounted = false); //cleanup function
  }, [products, BASE_URL, navigate, path, props.logged]);

  const logout = () => {
    props.onLogout();
  };

  /*   if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="loading-screen">{t('description.loadtext')}</div>;
    } else { */
  return (
    <div>
    <React.Fragment>
      {/* <header>
                <Header onLogout={logout} />
            </header> */}

      <div className="trip-container">
        <div className="trip-list">
          {!_.isEmpty(products) ? (
            products.map((product) => (
              <Product
                key={product.product_id}
                {...product}
              />
            ))
          ) : (
            <p className="message">Empty</p>
          )}
        </div>
      </div>

    </React.Fragment>
    </div>
  );
  //}else 
};

export default List;