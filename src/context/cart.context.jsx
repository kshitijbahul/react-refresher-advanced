import { createContext, useState } from "react";



export const CartContext = createContext({
    cartOpened: false,
    setCartOpened: () => null,
    cartItems: [],
    setCartItems: () => null,

});

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const providerValue = {cartOpened, setCartOpened};
    return (
        <CartContext.Provider value={providerValue}> 
            {children}
        </CartContext.Provider>
    );
}