import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const ShopPage = ({shop}) => {
    return ( 
        <Container>
            <Row>
                <Col xs="12">
                    <img src={shop.image_url} />
                </Col>
            </Row>
        </Container>
    )
}

export default ShopPage;