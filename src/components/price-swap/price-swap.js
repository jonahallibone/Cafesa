import React, { useEffect, useRef, useState } from "react";
import styles from "./price-swap.module.css";
import { Col, Row } from "react-bootstrap";

const PriceSwap = () => {

    
    return (
        <div className={`${styles.price_swap__container}`}>
            <div className={styles.price_swap}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h6 className="font-weight-bold">UNLIMITED SMALLS</h6>
                        <small className={`${styles.price_swap__desc} text-sm-left`}>Small Coffee, Tea and Specialty Drinks</small>
                    </Col>
                    <Col xs="4">
                        <h2 className={styles.price_swap__price}>$50</h2>
                        <h6>monthly</h6>
                    </Col>
                </Row>
            </div>
            <div className={styles.price_swap}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h6 className="font-weight-bold">UNLIMITED MEDIUM</h6>
                        <small className={`${styles.price_swap__desc} text-sm-left`}>Small Coffee, Tea and Specialty Drinks</small>
                    </Col>
                    <Col xs="4">
                        <h2 className={styles.price_swap__price}>$60</h2>
                        <h6>monthly</h6>
                    </Col>
                </Row>
            </div>
            <div className={styles.price_swap}>
                <Row className="align-items-center">
                    <Col xs="8">
                        <h6 className="font-weight-bold">UNLIMITED LARGE</h6>
                    </Col>
                    <Col xs="4">
                        <h2 className={styles.price_swap__price}>$65</h2>
                        <h6>monthly</h6>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default PriceSwap;