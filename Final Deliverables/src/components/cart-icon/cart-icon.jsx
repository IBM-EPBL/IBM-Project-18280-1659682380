import { useContext } from "react";

import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import {CartIconContainer,ShoppingCartIcon,ItemCount} from "./cart-icon.styles";

const CartIcon = ()=>{

    const {cartVisibility,setCartVisibility,cartItemsCount} = useContext(CartDropdownContext);

    const toggleCartVisibility = ()=>{
        setCartVisibility(!cartVisibility);
    }

    return (
        <CartIconContainer onClick={toggleCartVisibility}>
            <ShoppingCartIcon />
            <ItemCount>{cartItemsCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;