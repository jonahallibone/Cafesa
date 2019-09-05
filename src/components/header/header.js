import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import {Container, Col, Row} from 'react-bootstrap'
import Button from "../button/button";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const auth = useSelector(state => state.user)
    const [firebaseLoaded, setFirebaseLoaded] = useState(false);
    
    useEffect(() => {
        if(auth.firstLoad) {
          setFirebaseLoaded(true);
        }
      }, [auth.user])

    const _displaySignInUp = () => {
        return (
            <>
                <a className={styles["header-link"]}>Sign Up</a>
                <Button type="link" to="/login">SIGN IN</Button>
            </>
        )
    }

    const _displayUser = () => {
        return (
            <Link to={`/profile/${auth.user.id}`}>{auth.user.name}</Link>
        )
    }

    const _determineLoadState = () => {
        if(firebaseLoaded && auth.firstLoad) {
            return _displayUser()
        }
        
        else if(auth.firstLoad) {
            return _displaySignInUp()
        }
    }

    return (
        <header className={styles.header}>
            <Container>
                <Row> 
                    <Col xs="8" className="d-flex justify-content-start align-items-center">
                        <div className={styles.logo}>
                            <Link to="/"><img src="/images/logo.svg" /></Link>
                        </div>
                        <a className={styles["header-link"]}>How it works</a>
                        <a className={styles["header-link"]}>Our locations</a>
                        <a className={styles["header-link"]}>Help</a>
                        <a className={styles["header-link"]}>Company</a>
                        <a className={styles["header-link"]}>Merchants</a>
                    </Col>
                    <Col xs="4" className="d-flex justify-content-end align-items-center">
                        { _determineLoadState() }
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header;