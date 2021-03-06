import React, { useEffect, useState } from "react";
import styles from "./cart-toast.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../button/button";
import { ShoppingBag } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

const CartToast = () => {
    const cartData = useSelector(state => state.cart);
    const dispatch =  useDispatch();

    const _handleRemove = () => {
        dispatch({type: "cart/remove/item"});
    }

    return (
        <div className={`${styles.cart_toast} ${cartData.is_empty ? "" : styles.cart_toast__visible}`}>
            <Container>
                <Row className="align-items-center">
                    <Col xs="6">
                        <span className={styles.cart_toast__item_name}>{cartData.items !== undefined ? cartData.items.title : ""}</span>
                        &nbsp;
                        <span>to Bluestone Coffee</span>
                        <Button style={{marginLeft: "1rem"}} onClick={_handleRemove}>Remove</Button>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end">
                        <span className={styles.cart_toast__total_price}></span>
                        <Button type="link" to="/cart">
                            <ShoppingBag size={18} style={{marginRight: ".5rem"}}/>
                            View Cart (${cartData.is_empty ? "" : cartData.items.price})
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CartToast;