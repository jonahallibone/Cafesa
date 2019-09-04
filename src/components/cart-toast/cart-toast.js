import React, { useEffect, useState } from "react";
import styles from "./cart-toast.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../button/button";
import { ShoppingBag } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

const CartToast = () => {
    const cart = useSelector(state => state.cart);

    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [cartData, setCartData] = useState(null);
    
    useEffect(() => {   
        cart.items.length ? setIsCartEmpty(false) : setIsCartEmpty(true);
        console.log(cart);
        setCartData(cart);
    }, [cart]);

    const getPrice = () => {
        if(cart.items.length) {
            const total = cart.items.reduce((acc, item) => acc + item.price, 0);

            return total;
        }
    }

    return (
        <div className={`${styles.cart_toast} ${isCartEmpty ? "" : styles.cart_toast__visible}`}>
            <Container>
                <Row className="align-items-center">
                    <Col xs="6">
                        <span className={styles.cart_toast__item_name}></span>
                        &nbsp;
                        <span>to Bluestone Coffee</span>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <span className={styles.cart_toast__total_price}></span>
                        <Button>
                            <ShoppingBag size={18} style={{marginRight: ".5rem"}}/>
                            View Cart (${getPrice()})
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CartToast;