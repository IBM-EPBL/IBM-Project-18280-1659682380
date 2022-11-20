import { CartItemContainer,ItemDetails } from "./cart-item.styles";

const CartItem = ({product})=>{
    const {title,img_url,price,quantity} = product;
    return (
        <CartItemContainer>
            <img src={img_url} alt={`${title}`}/>
            <ItemDetails>
                <span className="name">{title}</span>
                <span className="price">{quantity} x &#8377; {price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem; 