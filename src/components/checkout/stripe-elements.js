import React from "react";
import {CardElement, injectStripe} from 'react-stripe-elements';

const CheckoutForm = () => {
    return (
        <div className="checkout">
            <CardElement />
        </div>
    )   
}

export default injectStripe(CheckoutForm);