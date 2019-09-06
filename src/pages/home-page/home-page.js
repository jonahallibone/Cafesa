import React, { useEffect } from "react";
import styles from "./home-page.module.css";
import HomePageSlogan from "../../components/home-page-slogan/HomePageSlogan";
import {Container, Row, Col} from "react-bootstrap";
import sharedStyles from "../../shared-styles/shared-styles.module.css";
import StoreItem from "../../components/store-item/store-item";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../components/firebase/firebase";

const HomePage = () => {
    const dispatch = useDispatch();
    const shops = useSelector(state => state.shops);
 
    useEffect(() => {
        firebase.firestore().collection("shops").get().then(querySnapshot => {
            const locations = querySnapshot.docs.map(shop => {
                return { id: shop.id, ...shop.data() }
            });

            dispatch({type: "shops/set-all-shops", payload: locations});
        });
    }, []);

    const _getList = (shops) => {
        console.log(shops);
        return shops.locations.map(shop => <StoreItem key={shop.id} shop={shop} />)
    }

    return(
        <div className={styles.homepage}>
            <div className={styles.banner}>
                <HomePageSlogan />
            </div>
            <Container className={styles.featured_shops}>
                <Row className="justify-content-center">
                    <Col xs="12" sm="8" md="8">
                        <h1 className="font-weight-bold text-center">Check out our most recently added shops!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="d-flex justify-content-center">
                        <span className={styles.borrough}>Manhattan</span>
                        <span className={styles.borrough}>Brooklyn</span>
                        <span className={styles.borrough}>Queens</span>
                        <span className={styles.borrough}>Bronx</span>
                    </Col>
                </Row>
                <div className={sharedStyles.list}>
                    {_getList(shops)}
                </div>
            </Container>
        </div>
    )
}

export default HomePage;