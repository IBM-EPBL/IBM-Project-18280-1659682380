import { createContext,useEffect,useState } from "react";

const addCartItem = (cartItems,productToAdd)=>{
    const productToAddFound = cartItems.find((item)=>item.id === productToAdd.id);

    if(productToAddFound){
        return cartItems.map((cartItem)=>(
            cartItem.id === productToAdd.id
            ?
                {...cartItem,quantity:cartItem.quantity+1}
            :
                cartItem
        ));
    }
    
    return [...cartItems,{...productToAdd,quantity:1}];
};

const reomveCartItem = (cartItems,productToRemove)=>{
    
    if(productToRemove.quantity === 1 ){
        return cartItems.filter((cartItem)=>(cartItem.id !== productToRemove.id));
    }
    
    return cartItems.map((cartItem)=>(
        cartItem.id === productToRemove.id
        ?
            {...cartItem,quantity:cartItem.quantity-1}
        :
            cartItem
    ));
}

const clearCartItem = (cartItems,productToClear)=>{
    return cartItems.filter((cartItem)=>(cartItem.id !== productToClear.id));
}

export const CartDropdownContext = createContext({
    cartVisibility:false,
    setCartVisibility: ()=>null,
    totalCartItems:0,
    cartItemsCount:[],
    addItemToCart: ()=>null,
    removeItemFromCart:()=>null,
    clearItemFromCart:()=>null,
    setCartItems:()=>null,
    totalAmount:0
});

export const CartDropdownProvider = ({children})=>{
    const [cartVisibility,setCartVisibility] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartItemsCount,setCartItemsCount] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    
    useEffect(()=>{
        const newTotalItems = cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
        setCartItemsCount(newTotalItems);
    },[cartItems]);

    useEffect(()=>{
        const newTotalAmount = cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0);
        setTotalAmount(newTotalAmount);
    },[cartItems]);

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }

    const removeItemFromCart = (productToRemove)=>{
        setCartItems(reomveCartItem(cartItems,productToRemove));
    }

    const clearItemFromCart = (productToClear)=>{
        setCartItems(clearCartItem(cartItems,productToClear));
    }

    const value = {cartVisibility,setCartVisibility,cartItemsCount,cartItems,setCartItems,addItemToCart,removeItemFromCart,clearItemFromCart,totalAmount};
    return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>
}
