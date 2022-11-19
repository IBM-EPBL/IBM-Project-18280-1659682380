import { useContext } from "react";

import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import {CheckoutItemContainer,ImageContainer,RemoveButton} from "./checkout-item.styles";

const CheckoutItem = ({cartItem})=>{

    const {title,img_url,name,quantity,price} = cartItem;

    const {addItemToCart,removeItemFromCart,clearItemFromCart} = useContext(CartDropdownContext);

    const addItemToCartHandler = ()=> addItemToCart(cartItem);
    
    const removeItemFromCartHandler = ()=>removeItemFromCart(cartItem);
    
    const clearItemFromCartHandler = ()=>clearItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={img_url} alt={`${name}`} />
            </ImageContainer>
            <span className="name">{title}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemFromCartHandler}>&#10094; </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemToCartHandler}>&#10095; </div>
            </span>
           <span className="price">{price}</span>
           <RemoveButton onClick={clearItemFromCartHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;