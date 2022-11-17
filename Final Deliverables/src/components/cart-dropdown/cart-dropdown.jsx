import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import Button from "../button/button";
import CartItem from "../cart-item/cart-item";

import {CartDropdownContainer,CartItemsContainer,EmptyMessage} from "./cart-dropdown.styles";
import { UserContext } from "../../contexts/user.context";

const CartDropdown = ()=>{

    const {cartItems} = useContext(CartDropdownContext);
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate();

    const checkOutHandler = ()=>{
        currentUser ?
            navigate("/checkout")
        :
            navigate("/auth/login")
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length > 0
                    ? 
                        cartItems.map((item)=><CartItem key={item.id} product={item}/>)
                    :
                        <EmptyMessage>Your cart is empty!</EmptyMessage>
                }
            </CartItemsContainer>
            <Button onClick={checkOutHandler}>Checkout</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;