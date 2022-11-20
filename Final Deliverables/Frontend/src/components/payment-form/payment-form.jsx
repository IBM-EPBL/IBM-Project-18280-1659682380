import { useState,useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import FormInput from "../form-input/FormInput";
import { BUTTON_TYPE_CLASSES } from "../button/button";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const defaultFormFields = {
    card_no : "",
    month : "",
    year:"",
    cvv:""
}

const PaymentForm = ()=>{


    const [formFields,setformFields] = useState(defaultFormFields);
    const {card_no,month,year,cvv} = formFields;
    const {cartItems,setCartItems,totalAmount} = useContext(CartDropdownContext);
    const {currentUser} = useContext(UserContext);

    const [isProcessingPayment,setIsProcessingPayment] = useState(false);

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setformFields({...formFields,[name]:value});
    }

    const paymentHandler = async (event)=>{
        event.preventDefault();

        setIsProcessingPayment(true);

        try{
            const data = new FormData()
            data.append("NAME",currentUser.NAME);
            data.append("ITEMS",JSON.stringify(cartItems))
            data.append("TOTAL",totalAmount)
            const response = await fetch('http://127.0.0.1:5000/placeOrder',{
                method:'POST',
                body:data,
                header:{
                    'Access-Control-Allow-Origin':'*'
                }
            })
            const value = await response.json()
            setIsProcessingPayment(false);
            if(value.code !== "ok"){
                throw value.code
            }
            else{
                alert("Payment successful");
                setCartItems([])
            }
        }
        catch(error){
            setIsProcessingPayment(false);
            alert("Payment Failed!!! Please try again.");
        }

    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={ paymentHandler }>
                <h2>Credit Card Payment</h2>
                <FormInput 
                    label="Card Number" 
                    type="number" 
                    name="card_no" 
                    value={card_no} 
                    required 
                    onChange={handleChange}/>
                    <FormInput 
                    label="Expiry Month" 
                    type="number" 
                    name="month" 
                    value={month} 
                    required 
                    onChange={handleChange}/>
                    <FormInput 
                    label="Expiry Year" 
                    type="number" 
                    name="year" 
                    value={year} 
                    required 
                    onChange={handleChange}/>
                    <FormInput 
                    label="Card CVV" 
                    type="number" 
                    name="cvv" 
                    value={cvv} 
                    required 
                    onChange={handleChange}/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={ BUTTON_TYPE_CLASSES.inverted }>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;