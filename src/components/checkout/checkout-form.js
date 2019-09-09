import React, { useEffect } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import Button from "../button/button";

const CheckoutForm = ({auth, cartData, stripe}) => {
    useEffect(() => {
        console.log(stripe);
    }, [stripe]);
    
    const createToken = async (data) => {
        let { token } = await stripe.createToken(data);
    }

    const createCharge = async () => {
        const req = await fetch('https://us-central1-cafesa-77e07.cloudfunctions.net/createPayment', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                stripe_token: await createToken({name: auth.user.name}),
                user: auth.user,
                cart: cartData.items
            })
        });
    }

    return (
        <div className="checkout">
            <small><strong>CARD DETAILS</strong></small>
            <div style={{marginTop: ".5rem" }}>
                <CardElement />
            </div>
            <Button onClick={createCharge} style={{width: "100%", marginTop: "1rem", background: "#1e90ff", color: "#FFF"}}>
                Start ${cartData.items.price} Subscription
            </Button>
        </div>
    )   
}

export default injectStripe(CheckoutForm);