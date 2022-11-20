import { useContext } from "react";

import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import Button,{BUTTON_TYPE_CLASSES} from "../button/button";

import {ProductCardContainer,ProductFooter} from "./product-card.styles.jsx";

const ProductCard = ({product})=>{

    const {title,img_url,price} = product;

    const {addItemToCart} = useContext(CartDropdownContext);

    const addItem = ()=> addItemToCart(product);
    

    return (
        <ProductCardContainer>
            <img src={img_url} alt={`${img_url}`}/>
            <ProductFooter>
                <span className="name">{title}</span>
                <span className="price">&#8377;{price}</span>
            </ProductFooter>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addItem}>Add to cart</Button>
        </ProductCardContainer>
    );
}

export default ProductCard;