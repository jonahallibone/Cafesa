import React, { useEffect } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import Button from "../button/button";

const CheckoutForm = ({auth, cartData, stripe}) => {
    useEffect(() => {
        console.log(stripe);
    }, [stripe]);
    
    const createToken = async (data) => {
        let { token } = await stripe.createToken(data);
        return token;
    }

    const createCharge = async () => {
        const token = await createToken({name: auth.user.name});
        
        // Dirty check for token; continue if found
        console.log(token);
        if(token === undefined) return; 

        try {
                const req = await fetch('http://localhost:5000/cafesa-77e07/us-central1/createPayment', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    stripe_token: token,
                    user: auth.user,
                    cart: cartData.items
                })
            });

            if (req.ok) {

            }
        }

        catch {

        }
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