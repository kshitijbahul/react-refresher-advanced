import { createContext, useState } from "react";

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
});

export const CartProvider = ({children}) => {
    const [ cartItems, setCartItems] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        setCartItems(newCartItems);
    }
    const providerValue = {cartOpened, setCartOpened, cartItems,addItemToCart};
    
    return (
        <CartContext.Provider value={providerValue}> 
            {children}
        </CartContext.Provider>
    );
}