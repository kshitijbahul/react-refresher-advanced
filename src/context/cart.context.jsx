import { type } from "@testing-library/user-event/dist/type";
import { createContext, useState, useEffect, useReducer } from "react";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    ADD_ITEM_TO_CART : 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART : 'REMOVE_ITEM_FROM_CART',
    DECREASE_ITEM_COUNT_FROM_CART : 'DECREASE_ITEM_COUNT_FROM_CART',
    TOGGLE_CART : 'TOGGLE_CART',
}
const removeItemFromCart = (cartItems,removedProduct) => {
    return cartItems.filter(( cardItem )=> cardItem.id !== removedProduct.id);
}
const decreaseItemFromCart = (cartItems,removedProduct) =>  {
    const cartElement = cartItems.find((cartItem) => cartItem.id === removedProduct.id );
    if (cartElement.quantity === 1) {
        return removeItemFromCart(removedProduct);
    } else {
        const newCartItems = cartItems.map((cartItem) => 
            cartItem.id === removedProduct.id ? {...cartItem,quantity: cartItem.quantity-1} : cartItem
        );
        return newCartItems;
    }
    }
    
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
        case SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART:
            return {
                ...state,
                cartOpened: !cartOpened
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
    /* const [ cartItems, setCartItems] = useState([]);
    const [ cartOpened, setCartOpened ] = useState(false);
    const [ cartSize, setCartSize ] = useState(0);
    const [ cartValue, setCartValue ] = useState(0); */
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, cartOpened, cartSize, cartValue } = state;
    /* useEffect(() => {
        const cartItemCount = cartItems.reduce((cartCount,eachCartItem) => cartCount+eachCartItem.quantity ,0);
        setCartSize(cartItemCount);
    },[cartItems]);
    // goood to have single responsibility in the useEffect
    useEffect(() => {
        const totalPrice = cartItems.reduce (((cartCost,cartItem) => cartCost + (cartItem.quantity * cartItem.price )),0);
        setCartValue(totalPrice);
    },[cartItems]); */
    
    const addItemToCart = (productToAdd) => {
        const existingItem = cartItems.find(
            (eachItem) => eachItem.id === productToAdd.id
        );
        if(existingItem){
            return cartItems.map(
                (eachItem) =>  eachItem.id === productToAdd.id ? {...eachItem, quantity : eachItem.quantity+1} : eachItem
                
            );
        }
        const updatedCart =  [...cartItems, {...productToAdd, quantity: 1}];

        dispatch(
            {
                type: CART_ACTION_TYPES.SET_CART_ITEMS,
                payload: {
                    cartItems: updatedCart,
                    cartSize: getCartItemCount(updatedCart),
                    cartValue: getCartCost(updatedCart)
                }
            }
        );
    }
    const removeItemFromCart = (removedProduct) => {
        const updatedCart = cartItems.filter(( cardItem )=> cardItem.id !== removedProduct.id);
        
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: updatedCart,
                cartSize: getCartItemCount(updatedCart),
                cartValue: getCartCost(updatedCart)
            }
        });
    }
    const decreaseItemFromCart = (removedProduct) =>  {
        const existingItem = cartItems.find((cartItem) => cartItem.id === removedProduct.id );
        if (existingItem.quantity === 1) {
            removeItemFromCart(removedProduct);

        } else {
            const updatedCart = cartItems.map((cartItem) => {
                return cartItem.id === removedProduct.id ? 
                    {...cartItem,quantity: cartItem.quantity-1} 
                    : cartItem
            });
            dispatch({
                type: CART_ACTION_TYPES.SET_CART_ITEMS,
                payload: {
                    cartItems: updatedCart,
                    cartSize: getCartItemCount(updatedCart),
                    cartValue: getCartCost(updatedCart)
                }
            });
        }
    }

    const toggleCart = () => {
        dispatch({
            type: CART_ACTION_TYPES.TOGGLE_CART
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