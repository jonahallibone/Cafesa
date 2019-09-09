import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from "./stripe-elements"

const Checkout = () => {

    const auth = useSelector(state => state.user);

    return (
        <div className="form-group">
            <p>
                <small>NAME</small>
                <p>{auth.user.name}</p>
            </p>
            <p>
                <small>EMAIL</small>
                <p>{auth.user.email}</p>
            </p>
            <StripeProvider apiKey="pk_test_0NYdSwKvopOIgJmOJxAdTB8c">
                <Elements>
                    <CheckoutForm />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Checkout;