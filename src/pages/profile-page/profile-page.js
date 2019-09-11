import React from "react";
import {Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.user);

    return (
        <div className={styles.profile_page}>
            <Container>
                <Row className="p-4">
                    <Col xs="12">
                        <h4>Dashboard</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">
                        <div className={styles.profile__sidebar}>
                            <Container fluid className="p-0">
                                <Row>
                                    <Col xs="12" className="d-flex justify-content-center">
                                        <div className={styles.profile__picture_frame}>
                                            <img src={auth.user.profilePicture} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <h5 className="text-center m-3">{auth.user.name}</h5>
                                        <p className="text-center m-3">{auth.user.email}</p>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs="8">

                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfilePage;