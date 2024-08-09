import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(
        (eachItem) => eachItem.id === productToAdd.id
    );
    if(existingItem){
        return cartItems.map(
            (eachItem) =>  eachItem.id === productToAdd.id ? {...eachItem, quantity : eachItem.quantity+1} : eachItem
            
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
    
}



export const CartContext = createContext({
    cartOpened: false,
    toggleCart: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart : () => null,
    decreaseItemFromCart: () => null,
    cartValue: 0,
    cartSize: 0
});

export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const [ cartSize, setCartSize ] = useState(0);
    const [ cartValue, setCartValue ] = useState(0);
    useEffect(() => {
        const cartItemCount = cartItems.reduce((cartCount,eachCartItem) => cartCount+eachCartItem.quantity ,0);
        console.log('The Card Item count in the effect is ', cartItemCount);
        setCartSize(cartItemCount);
        const totalPrice = cartItems.reduce (((cartCost,cartItem) => cartCost + (cartItem.quantity * cartItem.price )),0);
        setCartValue(totalPrice);
    },[cartItems]);
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        setCartItems(newCartItems);
    }
    const removeItemFromCart = (removedProduct) => {
        const removedItems = cartItems.filter((cartItem)=> cartItem.id !== removedProduct.id);
        setCartItems(removedItems);
    }
    const decreaseItemFromCart = (removedProduct) =>  {
        const cartElement = cartItems.find((cartItem) => cartItem.id === removedProduct.id );
        if (cartElement.quantity === 1) {
            removeItemFromCart(removedProduct);
        } else {
            const newCartItems = cartItems.map((cartItem) => 
                cartItem.id === removedProduct.id ? {...cartItem,quantity: cartItem.quantity-1} : cartItem
            );
            setCartItems(newCartItems);
        }
    }
    const toggleCart = () => {
        setCartOpened(!cartOpened);
    }
    const providerValue = { cartOpened,toggleCart, cartItems, addItemToCart, cartSize, decreaseItemFromCart, removeItemFromCart, cartValue };
    
    return (
        <CartContext.Provider value={providerValue}> 
            {children}
        </CartContext.Provider>
    );
}