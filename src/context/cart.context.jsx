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
    setCartOpened: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartSize: 0
});

export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const [ cartSize, setCartSize ] = useState(0);
    useEffect(() => {
        const cartItemCount = cartItems.reduce((cartCount,eachCartItem) => cartCount+eachCartItem.quantity ,0);
        console.log('The Card Item count in the effect is ', cartItemCount);
        setCartSize(cartItemCount);
    },[cartItems]);
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        setCartItems(newCartItems);
    }
    const providerValue = { cartOpened,setCartOpened, cartItems, addItemToCart, cartSize };
    
    return (
        <CartContext.Provider value={providerValue}> 
            {children}
        </CartContext.Provider>
    );
}