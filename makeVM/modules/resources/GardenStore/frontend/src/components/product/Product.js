import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import '../styles.css';
import { useNavigate } from 'react-router';
import Moment from 'moment';


const Product = ({
    id,
    name,
    price,
    description,
    img,
    comments,
    rates,
    amount
}) => {
    function formatDate(date) {
        return Moment.utc(date).format("DD.MM.YYYY");
    }

    return (
        <Card>
            <Card.Body>
                <div className="trip-details">
                    <div>{name} </div>
                    <div>{img} </div>
                    <div>{description} </div>
                    <div>{amount} </div>
                    <div>{rates} </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;