import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements, StripeProvider } from 'react-stripe-elements';

import styles from "./checkout.module.css";
import CheckoutForm from "./checkout-form";

const Checkout = () => {

    const auth = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);

    const cartData = React.useMemo(() => {
        return cart;
    }, [cart]);

    return (
        <div className={styles.checkout}>
            <h4 className="font-weight-bold">Checkout</h4>
            <br />
            <div className={styles.cart_desc}>
                <small><strong>NAME</strong></small>
                <p>
                    <small>{auth.user.name}</small>
                </p>
            </div>
            <div className={styles.cart_desc}>
                <small><strong>EMAIL</strong></small>
                <p>
                    <small>{auth.user.email}</small>
                </p>
            </div>
            <div style={{marginTop: "1rem"}}>
                <small><strong>SUBSCRIPTION</strong></small>
                <p>
                    <small>{cartData.items.title} from {cartData.items.shop_name} for <sup>$</sup>{cartData.items.price}/<sub>month</sub></small>
                </p>
            </div>
            <StripeProvider apiKey="pk_test_0NYdSwKvopOIgJmOJxAdTB8c">
                <Elements>
                    <CheckoutForm auth={auth} cartData={cartData} />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Checkout;