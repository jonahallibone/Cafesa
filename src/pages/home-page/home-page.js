import React, {useState, useEffect} from "react";
import styles from "./home-page.module.css";
import HomePageSlogan from "../../components/home-page-slogan/HomePageSlogan";
import {Container, Row, Col} from "react-bootstrap";
import sharedStyles from "../../shared-styles/shared-styles.module.css";
import StoreItem from "../../components/store-item/store-item";

const shopStub = [
    {   
        id: "asdmad92992399mx293m",
        name: "Bluestone Coffee",
        address: "1551 W 42nd Street, New York, NY, 10018",
        image_url: "https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        wifi: true,
        air_conditioning: true,
        outlets: true,
        coffee: true,
        location: {
            lat: "",
            lng: ""
        }
    },
    {
        id: "maismdiamd9293m9ax",
        name: "Culture Coffee",
        address: "320 W 38th Street, New York, NY, 10018",
        image_url: "https://images.pexels.com/photos/887723/pexels-photo-887723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        wifi: true,
        air_conditioning: true,
        outlets: true,
        coffee: true,
        location: {
            lat: "",
            lng: ""
        }
    }
]

const HomePage = () => {
    
    const _getList = () => {
        return shopStub.map(shop => <StoreItem key={shop.id} shop={shop} />)
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