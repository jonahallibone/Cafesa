import React, { useEffect, useState } from "react";
import {Container, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../components/firebase/firebase";
import styles from "./shop-page.module.css";
import DirectionalLink from "../../components/directional-link/directional-link";
import Tabs, {
    TabTitle, 
    TabHeader,
    TabContent,
    TabSection
} from "../../components/tabs/tabs";
import PriceSwap from "../../components/price-swap/price-swap";
import Checkout from "../../components/checkout/checkout";

const ShopPage = ({match}) => {
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);
    const cart = useSelector(state => state.cart);

    const cartData = React.useMemo(() => {
        return cart;
    }, [cart]);

    const shopData = React.useMemo(() => {
        return shop.shop;
    }, [shop]);

    const fetchShop = async () => {
        const shop = await firebase.firestore().collection("shops").doc(match.params.id).get();

        if(shop.exists) {
            dispatch({type: "shop/get-shop", payload: {shop_id: shop.id, ...shop.data()}});
        }
    }

    // onLoad

    useEffect(() => {
        fetchShop();

        return () => {
            dispatch({type: "shop/get-shop", payload: {} });
        }
    }, []);

    return ( 
        <Container className={styles.shop_page}>
            <Row>
                <Col xs="12">
                    <DirectionalLink size={15}>Back to Shops</DirectionalLink>
                </Col>
            </Row>
            <Row className="align-items-start">
                <Col xs="8">
                    <h1 className={styles.shop_name}>{shopData.name}</h1>
                    <h6 className={styles.shop_address}>{shopData.address}</h6>
                    <div className={styles.shop__main_image}>
                        <img src={shopData.image_url} />
                    </div>
                    <Tabs selected="about">
                        <TabHeader>
                            <TabTitle title="about">Shop Description</TabTitle>
                            <TabTitle title="map">Map</TabTitle>
                        </TabHeader>
                        <TabContent>
                            <TabSection title="about">
                                <p>{shopData.description}</p>
                            </TabSection>
                            <TabSection title="map">

                            </TabSection>
                        </TabContent>
                    </Tabs>
                </Col>

                {/* Right Side */}

                <Col xs="4"  className="position-sticky" style={{top: "-7px"}}>
                    <Container fluid="true" className="p-0">
                        <Row>
                            <Col xs="12" className="d-flex flex-row align-items-end">
                                <div className={styles.shop__checkout}>
                                    <div 
                                        className={`${styles.shop__checkout__container} ${!cartData.is_empty ? styles.shop__checkout__container_transform : ""}`}
                                    >
                                        <div className={styles.shop__checkout__slide}>
                                            <PriceSwap cart={cartData} shop={shopData} price={shopData} />
                                        </div>
                                        <div className={styles.shop__checkout__slide}>
                                            <Checkout />
                                        </div>
                                    </div>
                                </div>
                            </Col>                            
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopPage;