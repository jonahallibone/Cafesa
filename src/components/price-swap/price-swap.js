import React, { useEffect, useRef, useState } from "react";
import styles from "./price-swap.module.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const PriceSwap = ({cart, shop}) => {
    const dispatch = useDispatch();

    const [selectedTier, setSelectedTier] = useState({});
    const [cartData, setCartData] = useState({});
    const [shopData, setShopData] = useState({});

    useEffect(() => {
        setCartData(cart);
        
        if(!cart.is_empty) {
            console.log(cart);
            setSelectedTier(cart.items);
        }

        setShopData(shop);
    }, [cart, shop])

    
    const _handleClick = tier => {
        setTier(tier);
    }

    const setTier = tier => {
        setSelectedTier(tier.title === selectedTier.title ? {} : {...tier, shop_id: shopData.shop_id, shop_name: shopData.name})
    }

    const _addToCart = () => {
        if(selectedTier.title !== undefined) {
            dispatch({type: "cart/add/item", payload: selectedTier })
        }
    }

    const _getTiers = () => {
        if(shopData.tiers) {
            return shopData.tiers.map((tier, index) => {
                return <Price selectedTier={selectedTier} onClick={() => _handleClick(tier)} price={tier.price} key={index} description={tier.description} title={tier.title} />
            });
        }
    }

    const getCartButtonText = cartData => {
        if(selectedTier.title === undefined) {
            return "Please selected an option"
        }

        else {
            return `Subscribe`;
        }
    }
    
    return (
        <div className={`${styles.price_swap__container}`}>
            {_getTiers()}
            <div className={styles.add_to_cart} disabled={selectedTier.title === undefined} onClick={_addToCart}>
                {getCartButtonText(cartData)}
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