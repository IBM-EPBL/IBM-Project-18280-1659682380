import { useState,useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { BUTTON_TYPE_CLASSES } from "../button/button";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = ()=>{

    const stripe = useStripe();
    const elements = useElements();
    const {cartItems,setCartItems,totalAmount} = useContext(CartDropdownContext);
    const {currentUser} = useContext(UserContext);

    const [isProcessingPayment,setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event)=>{
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/create-payment-intent",{
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ amount: totalAmount * 100 })
        }).then(res => res.json());

        const { paymentIntent : { client_secret } } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method : {
                card : elements.getElement(CardElement),
                billing_details : {
                    name : currentUser ? currentUser.NAME : "Guest"
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert("payment failed " + paymentResult.error);
            console.log(paymentResult);
        }
        else if( paymentResult.paymentIntent.status === "succeeded"){
            let data = new FormData()
            data.append("NAME",currentUser.NAME);
            data.append("ITEMS",JSON.stringify(cartItems))
            data.append("TOTAL",totalAmount)
            await fetch('http://127.0.0.1:5000/placeOrder',{
                method:'POST',
                body:data,
                header:{
                    'Access-Control-Allow-Origin':'*'
                }
            })
            alert("Payment successful");
            setCartItems([])
        }

    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={ paymentHandler }>
                <h2>Credit Card Payment</h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={ BUTTON_TYPE_CLASSES.inverted }>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;