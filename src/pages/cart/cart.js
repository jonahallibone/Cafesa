import React, { useState, useEffect } from "react";
import styles from "./cart.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../components/firebase/firebase";

const Cart = () => {
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    
    const [userData, setUserData] = useState({});
    const [cartData, setCartData] = useState(null);

    const [shopData, setShopData] = useState({});

    useEffect(() => {
        setUserData(user);
        setCartData(cart);
    }, [cart, user])


    const _getShopData = async (shop_id) => {
        const shop = await firebase.firestore().collection("shops").doc(shop_id).get();
        console.log(shop.data());

        if(shop.exists) {
            setShopData({shop_id: shop.id, ...shop.data()});
        }
    }

    useEffect(() => {
        console.log(cartData);
        if(cartData && !cartData.is_empty) {
            _getShopData(cartData.items.shop_id);
        }
    }, [cartData])

    return(
        <Container className={styles.cart}>
            <Row>
                <Col xs="12">
                    <h1 className="font-weight-bold">Your Cart</h1>
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <CartItem shopData={shopData} cartData={cartData}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart;

const CartItem = ({shopData, cartData}) => {
    return (
        <div className={styles.cart_item}>
            <Container fluid="true" className="p-0 m-0">
                <Row>
                    <Col xs="4">
                        <div className={styles.cart__shop_thumb}>
                            <img src={shopData.image_url} />
                        </div>
                    </Col>
                    <Col xs="8" className="d-flex flex-column justify-content-between">
                        <h5 className="font-weight-bold">{shopData.name}</h5>
                        <div>
                            <span>{cartData ? cartData.items.title : ""}</span>
                        </div>
                        <div>
                            <span className={styles.cart__remove}>Remove</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}