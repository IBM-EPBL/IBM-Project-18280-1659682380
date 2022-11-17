import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import CheckoutItem from "../../components/checkout-item/checkout-item";

import PaymentForm from "../../components/payment-form/payment-form";

import {CheckoutContainer,CheckoutHeader,HeaderBlock,Total} from  "./checkout.styles";

const Checkout = ()=>{

    const {cartItems,totalAmount} = useContext(CartDropdownContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock><span>Product</span></HeaderBlock>
                <HeaderBlock><span>Description</span></HeaderBlock>
                <HeaderBlock><span>Quantity</span></HeaderBlock>
                <HeaderBlock><span>Price</span></HeaderBlock>
                <HeaderBlock><span>Remove</span></HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem)=>(<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
            }
            <Total className="total">Total = &#8377; {totalAmount}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
}

export default Checkout;