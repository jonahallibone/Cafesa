import React from "react";
import styles from "./store-item.module.css";
import Icon from "../icon/icon";
import { Wifi, Coffee, Zap, Wind } from "react-feather";
import { Container, Row, Col } from "react-bootstrap";

const StoreItem = ({storeInfo}) => {
    return(
        <div className={styles.store_item}>
            <div className={styles.store_item__header}>
                <img 
                    className={styles.store_item__header_image}
                    src="https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                />
            </div>
            <div className={styles.store_item__body}>
                <span className={styles.store_item__name}>Culture Coffee</span>
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
        </div>
    )
}

export default StoreItem;