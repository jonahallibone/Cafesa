import React, { useEffect, useState } from "react";
import {Container, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft } from "react-feather";
import firebase from "../../components/firebase/firebase";
import sharedStyles from "../../shared-styles/shared-styles.module.css";
import styles from "./shop-page.module.css";
import DirectionalLink from "../../components/directional-link/directional-link";

const ShopPage = ({match}) => {
    const dispatch = useDispatch();
    const shop = useSelector(state => state.shop);

    const [shopData, setShopData] = useState({});

    useEffect(() => {
        console.log();
        setShopData(shop.shop)
;    }, [shop])

    const fetchShop = async () => {
        const shop = await firebase.firestore().collection("shops").doc(match.params.id).get();

        if(shop.exists) {
            dispatch({type: "shop/get-shop", payload: shop.data()});
        }
    }

    // onLoad

    useEffect(() => {
        fetchShop();
    }, []);

    return ( 
        <Container className={styles.shop_page}>
            <Row>
                <Col xs="12">
                    <DirectionalLink size={15}>Back to Shops</DirectionalLink>
                </Col>
            </Row>
            <Row>
                <Col xs="6">
                    <h1 className={styles.shop_name}>{shopData.name}</h1>
                    <div className={styles.shop__main_image}>
                        <img src={shopData.image_url} />
                    </div>
                </Col>
                <Col xs="6">
                    <div className={styles.shop__stats}>
                        <Container fluid="true" className="p-0">
                            <Row>
                                <Col xs="12" className="d-flex flex-row align-items-end">
                                    
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ShopPage;