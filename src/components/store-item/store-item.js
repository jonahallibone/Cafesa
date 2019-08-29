import React from "react";
import styles from "./store-item.module.css";
import Icon from "../icon/icon";
import {Link} from "react-router-dom";

import { Wifi, Coffee, Zap, Wind } from "react-feather";
import { Container, Row, Col } from "react-bootstrap";

const StoreItem = ({shop}) => {
    return(
        <Link to={`/shop/${shop.id}`} className={styles.store_item}>
            <div className={styles.store_item__header}>
                <img 
                    className={styles.store_item__header_image}
                    src={shop.image_url} 
                />
            </div>
            <div className={styles.store_item__body}>
                <span className={styles.store_item__name}>{shop.name}</span>
                <Container className="no-gutters p-0">
                    <Row className="no-gutters">
                        <Col className={`d-flex ${styles.store_item__icon_row}`}>
                            <Icon>
                                <Wifi size={18} />
                            </Icon>
                            <Icon>
                                <Coffee size={18} />
                            </Icon>
                            <Icon>
                                <Zap size={18} />
                            </Icon>
                            <Icon>
                                <Wind size={18} />
                            </Icon>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Link>
    )
}

export default StoreItem;