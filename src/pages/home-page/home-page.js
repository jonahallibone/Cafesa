import React, {useState, useEffect} from "react";
import styles from "./home-page.module.css";
import HomePageSlogan from "../../components/home-page-slogan/HomePageSlogan";
import {Container, Row, Col} from "react-bootstrap";
import sharedStyles from "../../shared-styles/shared-styles.module.css";
import StoreItem from "../../components/store-item/store-item";

const HomePage = () => {
    
    const _getList = () => {
        return <StoreItem />
    }

    return(
        <div className={styles.homepage}>
            <div className={styles.banner}>
                <HomePageSlogan />
            </div>
            <Container>
                <div className={sharedStyles.list}>
                    {_getList()}
                </div>
            </Container>
        </div>
    )
}

export default HomePage;