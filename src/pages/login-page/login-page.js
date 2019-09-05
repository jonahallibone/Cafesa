import React, { useEffect } from "react";
import styles from "./login-page.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from "../../components/button/button";
import {Facebook, Twitter} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import firebase from "../../components/firebase/firebase";

const LoginPage = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.user);

    useEffect(() => {
        console.log(auth);
    }, [auth])

    const _signInWithFacebook = async () => {
        var provider = new firebase.auth.FacebookAuthProvider();

        provider.setCustomParameters({
            'display': 'popup'
        });

        await firebase.auth().signInWithPopup(provider).then(function(result) {
            let user = result.user;
            let token = result.credential.accessToken;
            console.log(user);
            dispatch({type: "user/sign-in", 
                payload: {
                    user: {
                        id: user.uid,
                        profilePicture: user.photoURL,
                        email: user.email,
                        name: user.displayName
                    }, 
                    token: token
                }
            });

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    return (
        <div className={styles.login_page}>
            {
                auth.authenticated ? <Redirect to="/" /> : ""
            }
            <Container fluid={true}>
                <Row>
                    <Col xs="6" className={`${styles.login_page__height} flex-column d-flex justify-content-center align-items-center`}>
                        <h3>Sign into Cafsa</h3>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={values => {
                                let errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                }, 400);
                            }}
                            >
                            {({ isSubmitting }) => (
                                <Form className={`d-flex flex-column ${styles.login_page__form}`}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field placeholder="example@example.com" id="email" type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className={styles.login_page__form_error} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field id="password" type="password" name="password" className="form-control" />
                                        <ErrorMessage name="password" component="div" className={styles.login_page__form_error} />
                                    </div>
                                    <Button>Sign In</Button>
                                    <div className={styles.button_group} >
                                        <Button onClick={_signInWithFacebook}>Sign in with<Facebook color="#679BFF" /></Button>
                                        <Button>Sign in with<Twitter color="#679BFF" /></Button>
                                    </div>
                                </Form>
                            )}
                            </Formik>
                    </Col>
                    <Col xs="6" className={`${styles.login_page__background} ${styles.login_page__height}`}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage;