import React, { useState, useEffect } from "react";
import _ from "lodash";
import Product from "./Product";
import Header from "../structure/Header";
import "../styles.css";
import { useNavigate } from "react-router";

const List = (props) => {

    //const BASE_URL = props.baseUrl;

    let navigate = useNavigate();
    //const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    const path = window.location.pathname;
    const [pathChanged, setPathChanged] = useState('');

    /*   useEffect(() => {
    
        if (!props.logged) {
          navigate("/");
        }
    
        let mounted = true;
    
        if(mounted){
          if(path==='/map'){
            setPathChanged(false);
          }else{
            setPathChanged(true);
          }
        }
    
          setTimeout(() => {
            async function getTrips() {
            fetch(`${BASE_URL}/trips`, {
              method: "GET",
              credentials: "include",
            })
              .then((res) => res.json())
              .then(
                (result) => {
                  if (mounted) {
                    setIsLoaded(true);
                    setTrips(result);
                  }
                },
                (error) => {
                  if (mounted) {
                    setIsLoaded(true);
                    setError(error);
                  }
                }
              );
          }getTrips();
        }, 2000);
        return () => (mounted = false); //cleanup function
      }, [trips, BASE_URL, navigate, path, props.logged]);
     */


    const logout = () => {
        props.onLogout();
    };

    /*   if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="loading-screen">{t('description.loadtext')}</div>;
      } else { */
    return (
        <React.Fragment>
            <header>
                <Header onLogout={logout} />
            </header>
            <main>
                {pathChanged
                    ?
                    //for trip-list within editTrip & addTrip
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
                    :
                    //to get rid of padding-top within /map
                    {/* <div>
         {!_.isEmpty(products) ? (
            products.map((product) => (
              <Product
              key={product.product_id}
              {...product}
              />
            ))
          ) : (
            <p className="message">{t('description.notrip')}</p>
          )}
          </div> */}
                }
            </main>
        </React.Fragment>
    );
    //}else 
};

export default List;