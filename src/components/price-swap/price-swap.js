import React, { useEffect, useRef, useState } from "react";
import styles from "./price-swap.module.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const PriceSwap = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const [selectedTier, setSelectedTier] = useState({});
    const [cartButtonText, setCartButtonText] = useState("Please selected an option");

    const tiers = [
        {
            price: 50,
            description: "Small Coffee, Tea and Specialty Drinks",
            title: "Unlimited Small"
        },
        {
            price: 60,
            description: "Medium Coffee, Tea and Specialty Drinks",
            title: "Unlimited Medium"
        },
        {
            price: 65,
            description: "Large Coffee, Tea and Specialty Drinks",
            title: "Unlimited Large"
        }
    ]

    
    const _handleClick = tier => {
        setSelectedTier(tier.title === selectedTier.title ? {} : tier)
        setCartButtonText(`Add ${tier.title} to Cart!`)
    }

    const _addToCart = () => {
        dispatch({type: "cart/add/item", payload: selectedTier })
    }

    
    return (
        <div className={`${styles.price_swap__container}`}>
            {tiers.map((tier, index) => <Price selectedTier={selectedTier} onClick={() => _handleClick(tier)} price={tier.price} key={index} description={tier.description} title={tier.title} />)}

            <div className={styles.add_to_cart} disabled={selectedTier.title === undefined} onClick={_addToCart}>
                {cartButtonText}
            </div>
        </div>
    )
}

export default PriceSwap;

const Price = ({price, description, title, selectedTier = {}, ...rest}) => {

    return(
        <div className={`${styles.price_swap} ${selectedTier.title === title ? styles.price_swap__selected : ""}`} {...rest}>
            <Row className="align-items-center">
                <Col xs="8">
                    <h6 className="font-weight-bold">{title}</h6>
                    <small className={`${styles.price_swap__desc} text-sm-left`}>{description}</small>
                </Col>
                <Col xs="4">
                    <h2 className={styles.price_swap__price}>${price}</h2>
                    <h6>monthly</h6>
                </Col>
            </Row>
        </div>
    )
}