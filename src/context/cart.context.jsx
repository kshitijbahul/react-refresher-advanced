import { createContext, useReducer } from "react";
   
const INITIAL_STATE = {
    cartOpened: false,
    cartItems: [],
    cartValue: 0,
    cartSize: 0
}

export const cartReducer = (state, action) => {

    const { cartItems, cartOpened,cartSize } = state;
    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {
                ...state,
                cartOpened: payload,
            }
        default:
            throw new Error(`Unknown action type: ${type} in cartReducer`);

    }
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

const getCartItemCount = (cartItems) => {
    return cartItems.reduce((cartCount,eachCartItem) => cartCount + eachCartItem.quantity ,0);
}

const getCartCost = (cartItems) => {
    return cartItems.reduce (((cartCost,cartItem) => cartCost + (cartItem.quantity * cartItem.price )),0);
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, cartOpened, cartSize, cartValue } = state;
    const updateCartItemsReducer = (newCartItems) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartSize: getCartItemCount(newCartItems),
                cartValue: getCartCost(newCartItems)
            }
        })
    }
    const addItemToCart = (productToAdd) => {
        const updatedCart =  addCartItem(cartItems,productToAdd);
        updateCartItemsReducer(updatedCart);
    }
    const removeItemFromCart = (removedProduct) => {
        const updatedCart = removeCartItem(cartItems,removedProduct);
        
        updateCartItemsReducer(updatedCart);
    }
    const decreaseItemFromCart = (removedProduct) =>  {
        const updatedCart = decreaseCartItem(cartItems,removedProduct);
        updateCartItemsReducer(updatedCart);
    }

    const toggleCart = () => {
        dispatch({
            type: CART_ACTION_TYPES.TOGGLE_CART,
            payload: !cartOpened,
        });
    }
    const providerValue = { 
        cartOpened,
        toggleCart,
        cartItems,
        addItemToCart,
        cartSize,
        decreaseItemFromCart,
        removeItemFromCart,
        cartValue 
    };
    
    return (
        <CartContext.Provider value={providerValue}> 
            {children}
        </CartContext.Provider>
    );
}