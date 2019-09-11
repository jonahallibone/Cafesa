import React, { useEffect, useState } from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';
import Button from "../button/button";
import Loader from "react-loader-spinner";
import { useDispatch } from "react-redux";

const CheckoutForm = ({auth, cartData, stripe}) => {
    const dispatch = useDispatch();
    const [isCreatingCharge, setIsCreatingCharge] = useState(false);

    useEffect(() => {
        console.log(stripe);
    }, [stripe]);
    
    const createToken = async (data) => {
        let { token } = await stripe.createToken(data);
        return token;
    }

    const createCharge = async () => {
        setIsCreatingCharge(true); 

        const token = await createToken({name: auth.user.name});
            
        // Dirty check for token; continue if found
        // console.log(token);
        if(token === undefined) {
            setIsCreatingCharge(false);
            return; 
        }

        try {
            const req = await fetch('http://localhost:5001/cafesa-77e07/us-central1/createPayment', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    stripe_token: token,
                    user: auth.user,
                    cart: cartData.items
                })
            }).then(res => {
                if(res.ok) return res.json();
            });

            if(req.response === "success") {
                dispatch({
                    type: "user/set-subscription-details", 
                    payload: req.data
                });

                dispatch({type: "cart/remove/item"});

            }

            setIsCreatingCharge(false);
        }

        catch {
            console.error("Network Error!!!1");
        }
    }

    return (
        <div className="checkout">
            <small><strong>CARD DETAILS</strong></small>
            {
                auth.fetching // If getting information about the user still
                ?
                <Loader type="Oval" color="#999" height={30} width={30} style={{margin: "1rem 0"}} />
                :
                <>
                    <div style={{marginTop: ".5rem" }}>
                        <CardElement />
                    </div>
                    <div>
                        {
                            isCreatingCharge // If the charge is currently happening
                            ?
                            <Loader type="Oval" color="#999" height={30} width={30} style={{margin: "1rem 0"}} />
                            :
                            <Button onClick={createCharge} style={{width: "100%", marginTop: "1rem", background: "#1e90ff", color: "#FFF"}}>
                                Start ${cartData.items.price} Subscription
                            </Button>
                        }
                    </div>
                </>
            }
            
        </div>
    )   
}

export default injectStripe(CheckoutForm);